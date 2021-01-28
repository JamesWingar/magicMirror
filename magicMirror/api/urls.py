from django.urls import path
from .views import (
    DateListView, JobListView, EventListView,
    DateRetrieveView, JobRetrieveView, EventRetrieveView
)


urlpatterns = [
    path('date', DateListView.as_view(), name='date'),
    path('date/<int:id>', DateRetrieveView.as_view(), name='date id'),
    path('job', JobListView.as_view(), name='job'),
    path('job/<int:id>', JobRetrieveView.as_view(), name='job id'),
    path('event', EventListView.as_view(), name='event'),
    path('event/<int:id>', EventRetrieveView.as_view(), name='event id'),
]
