from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

import datetime


class Date(models.Model):
    date = models.DateField('date', unique=True, default=datetime.date.today)

    def __str__(self):
        return self.date.strftime("%Y-%m-%d")

    def date_delta(self):
        return self.date - datetime.date.today()

    def days_from(self):
        delta = self.date - datetime.date.today()

        if delta > datetime.timedelta(days=1):
            string = self.date.strftime('%A') + ' in {} days'.format(delta.days)
        elif delta > datetime.timedelta(days=0):
            string = 'Tomorrow'
        elif delta == datetime.timedelta(days=0):
            string = 'Today'
        elif delta > datetime.timedelta(days=-1):
            string = 'Yesterday'
        else:
            string = '{} days ago'.format(abs(delta.days))

        return string

    def get_jobs(self):
        return self.job_set.all()

    def get_events(self):
        return self.event_set.all()


class Job(models.Model):
    due_date = models.ForeignKey(Date, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    asignee = models.CharField(max_length=50)
    job_id = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Event(models.Model):
    start_date = models.ForeignKey(Date, on_delete=models.CASCADE)
    start_time = models.CharField(max_length=5)
    length = models.IntegerField(default=1, validators=[MinValueValidator(0), MaxValueValidator(1000)])
    end_date = models.DateField('end date', default=datetime.date.today)
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    event_id = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    def get_dates(self):
        return self.dates.all()
