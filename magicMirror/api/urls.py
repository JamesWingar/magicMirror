from django.urls import path
from .views import (
    getJobs, getJob,
    getEvents, getEvent,
    getDates, getDate,
    getJobsOnDate, getEventsOnDate,
    getJobsFromDate, getEventsFromDate,
)


urlpatterns = [
    path('jobs', getJobs.as_view(), name='jobs'),
    path('job/<int:id>', getJob.as_view(), name='job id'),

    path('events', getEvents.as_view(), name='events'),
    path('event/<int:id>', getEvent.as_view(), name='event id'),

    path('dates', getDates.as_view(), name='dates'),
    path('date/<int:id>', getDate.as_view(), name='date id'),

    path('date/job/<slug:date>', getJobsOnDate.as_view(), name='jobs on date'),
    path('date/event/<slug:date>', getEventsOnDate.as_view(), name='events on date'),

    path('date/job/from/<slug:date>', getJobsFromDate.as_view(), name='jobs from date'),
    path('date/event/from/<slug:date>', getEventsFromDate.as_view(), name='events from date'),
]
