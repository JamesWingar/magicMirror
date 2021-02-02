from django.urls import path
from .views import (
    getJobs, getJob,
    getEvents, getEvent,
    getDates, getDate,
    getJobsOnDate, getEventsOnDate,
    getJobsFromDate, getEventsFromDate,
)


urlpatterns = [
    path('job', getJobs.as_view(), name='job'),
    path('job/<int:id>', getJob.as_view(), name='job id'),

    path('event', getEvents.as_view(), name='event'),
    path('event/<int:id>', getEvent.as_view(), name='event id'),

    path('date', getDates.as_view(), name='date'),
    path('date/<int:id>', getDate.as_view(), name='date id'),

    path('date/job/<slug:date>', getJobsOnDate.as_view(), name='jobs on date'),
    path('date/event/<slug:date>', getEventsOnDate.as_view(), name='events on date'),

    path('date/job/from/<slug:date>', getJobsFromDate.as_view(), name='jobs from date'),
    path('date/event/from/<slug:date>', getEventsFromDate.as_view(), name='events from date'),
]
