from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Date, Job, Event
from .serializers import (
        DateSerializer, JobSerializer, EventSerializer
)

from datetime import datetime


# Date API views
class getDates(generics.ListAPIView):
    queryset = Date.objects.all()
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class getDate(generics.RetrieveAPIView):
    queryset = Date.objects.all()
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


# Get on specific Date API views
class getJobsOnDate(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        request_date = datetime.strptime(self.kwargs['date'], '%Y-%m-%d').date()
        return Job.objects.filter(due_date__date=request_date)


class getEventsOnDate(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        request_date = datetime.strptime(self.kwargs['date'], '%Y-%m-%d').date()
        return Event.objects.filter(due_date__date=request_date)


# Get from (future) specific Date API views
class getJobsFromDate(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        request_date_from = datetime.strptime(self.kwargs['date'], '%Y-%m-%d').date()
        return Job.objects.filter(due_date__date__gte=request_date_from)


class getEventsFromDate(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        request_date_from = datetime.strptime(self.kwargs['date'], '%Y-%m-%d').date()
        return Event.objects.filter(due_date__date__gte=request_date_from)


# Job API views
class getJobs(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class getJob(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


# Event API views
class getEvents(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class getEvent(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'
