from apscheduler.schedulers.background import BackgroundScheduler  # apscheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore, register_events  # django-apscheduler
from django_apscheduler.models import DjangoJobExecution

from ..models import Date, Event, Job  # django app models
import requests  # required for todoist api
from google.oauth2 import service_account  # required for google api
import googleapiclient.discovery

from datetime import date, timedelta
import api.scheduler.schedulerUtils as utils
import yaml, logging, sys

# Scheduler logger
log_format = logging.Formatter('[%(asctime)s] %(message)s', '%d/%b/%Y %H:%M:%S')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(log_format)
logger.addHandler(handler)

# Get config file
with open(utils.CONFIG_PATH, "r") as ymlfile:
    config = yaml.load(ymlfile, Loader=yaml.FullLoader)

"""
METHOD DESCRIPTION
"""
def update_models_date():
    first_day = date.today() - timedelta(date.today().weekday())
    for delta_days in range(14):
        if not Date.objects.filter(date=first_day + timedelta(days=delta_days)):
            Date.objects.create(date=first_day + timedelta(days=delta_days))
    Date.objects.filter(date__lt=first_day).delete()

    assert (len(Date.objects.all()) == 14), "Too many or Too few date objects."
    logger.info("Ran scheduled [update dates]")


"""
METHOD DESCRIPTION
"""
def update_models_event():
    # read config/environment variables for calendar_id
    calendar_id = config['calendar']['id']

    # Google calendar API call
    google_service = googleapiclient.discovery.build(
        'calendar',
        'v3',
        credentials=service_account.Credentials.from_service_account_file(
            utils.SERVICE_ACCOUNT_FILE,
            scopes=utils.GOOGLE_API
        )
    )
    google_calendar = google_service.events().list(calendarId=calendar_id).execute().get('items', [])

    utils.update_or_create_events(google_calendar, config)


"""
METHOD DESCRIPTION
"""
def update_models_job():
    # Todoist API call
    todoist_tasks = requests.get(
        utils.TODOIST_API,
        params={
            'project_id': config['job']['project_id']
        },
        headers={
            "Authorization": f"Bearer {config['job']['key']}"
        }
    ).json()

    utils.update_or_create_jobs(todoist_tasks, config)


"""
METHOD DESCRIPTION
"""
def update_database():
    update_models_event()
    logger.info("Ran scheduled [update events]")
    update_models_job()
    logger.info("Ran scheduled [update jobs]")


"""
METHOD DESCRIPTION
"""
def update_all():
    update_models_date()
    update_models_event()
    update_models_job()
    logger.info("Startup database...")


"""
METHOD DESCRIPTION
"""
def remove_all():
    Date.objects.all().delete()
    Event.objects.all().delete()
    Job.objects.all().delete()


"""
METHOD DESCRIPTION
"""
def delete_old_job_executions(max_age=86400):
    """This job deletes all apscheduler job executions older than `max_age` from the database."""
    DjangoJobExecution.objects.delete_old_job_executions(max_age)


"""
METHOD DESCRIPTION
"""
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    scheduler.add_job(
        delete_old_job_executions,
        trigger=CronTrigger(hour="00", minute="00"),  # Every day at midnight
        id="delete_old_job_executions",
        max_instances=1,
        replace_existing=True,
    )
    logger.info("Added daily cleanup job.")

    scheduler.add_job(
        update_models_date,
        trigger=CronTrigger(hour="00", minute="00"),  # Every day at midnight
        id="update_date",
        max_instances=1,
        replace_existing=True,
    )
    logger.info("Added daily job [update dates]")

    scheduler.add_job(
        update_database,
        trigger=CronTrigger(second="*/10"),  # Every 10 seconds
        id="update_database",
        max_instances=1,
        replace_existing=True,
    )
    logger.info("Added constant job [update database]")

    try:
        logger.info("Starting scheduler...")
        register_events(scheduler)
        scheduler.start()
    except KeyboardInterrupt:
        logger.info("Stopping scheduler...")
        scheduler.shutdown()
        logger.info("Scheduler shut down successfully!")
