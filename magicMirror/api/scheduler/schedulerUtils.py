from ..models import Date, Event, Job  # django app models
from datetime import datetime
import pathlib
import re


"""
METHOD DESCRIPTION
"""
def get_datetimes(event):
    param = 'date' if 'date' in event['start'] else 'dateTime'
    start_datetime = datetime.strptime(
        DATE_PARAMS[param]['pattern'].search(
            event['start'][param]).group(),
        DATE_PARAMS[param]['format'])
    end_datetime = datetime.strptime(
        DATE_PARAMS[param]['pattern'].search(
            event['end'][param]).group(),
        DATE_PARAMS[param]['format'])

    start_time = 'All day' if param == 'date' else start_datetime.strftime('%H:%M')

    return start_datetime, end_datetime, start_time


"""
METHOD DESCRIPTION
"""
def update_or_create_events(calendar, config):

    # Add or update current events
    event_id_list = []
    for event in calendar:
        start_datetime, end_datetime, start_time = get_datetimes(event)
        if Date.objects.filter(date=start_datetime.strftime('%Y-%m-%d')):
            obj, created = Event.objects.update_or_create(
                event_id=event['id'],
                defaults={
                    'start_date': Date.objects.get(date=start_datetime.strftime('%Y-%m-%d')),
                    'start_time': start_time,
                    'length': (end_datetime - start_datetime).seconds//3600,
                    'end_date': end_datetime.strftime('%Y-%m-%d'),
                    'title': event['summary']
                })
            event_id_list.append(event['id'])

    # delete old events
    Event.objects.all().exclude(event_id__in=event_id_list).delete()


"""
METHOD DESCRIPTION
"""
def update_or_create_jobs(tasks, config):

    # Add or update current events
    task_id_list = []
    for task in tasks:
        if 'due' in task.keys():
            due_date = task['due']['date']
            if Date.objects.filter(date=due_date):
                obj, created = Job.objects.update_or_create(
                    job_id=task['id'],
                    defaults={
                        'due_date': Date.objects.get(date=due_date),
                        'assignee': config['job']['users'][task['assignee']],
                        'title': task['content']
                    })
                task_id_list.append(task['id'])

    # delete old tasks
    Job.objects.all().exclude(job_id__in=task_id_list).delete()


# ==================== CONSTANTS ====================
CONFIG_PATH = pathlib.Path.cwd() / 'config' / 'config.yml'
SERVICE_ACCOUNT_FILE = pathlib.Path.cwd() / 'config' / 'credentials.json'
GOOGLE_API = ['https://www.googleapis.com/auth/calendar']
TODOIST_API = 'https://api.todoist.com/rest/v1/tasks'


DATE_PARAMETERS = {
    'format': '%Y-%m-%d',
    'pattern': re.compile(r'(\d{4}-\d{1,2}-\d{1,2})')
}

DATETIME_PARAMETERS = {
        'format': '%Y-%m-%dT%H:%M:%S',
        'pattern': re.compile(r'(\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2})')
}

DATE_PARAMS = {
    'date': {
        'format': '%Y-%m-%d',
        'pattern': re.compile(r'(\d{4}-\d{1,2}-\d{1,2})')
    },
    'dateTime': {
            'format': '%Y-%m-%dT%H:%M:%S',
            'pattern': re.compile(r'(\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2})')
    }
}
