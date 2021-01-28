from django.db import models

import datetime


class Date(models.Model):
    date = models.DateField('date')

    def __str__(self):
        return self.date.strftime("%d-%m-%Y")

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
    date_due = models.ForeignKey(Date, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    asignee = models.CharField(max_length=50)
    job_id = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Event(models.Model):
    dates = models.ManyToManyField(Date)
    end_date = models.DateField('end date')
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    event_id = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    def get_dates(self):
        return self.dates.all()
