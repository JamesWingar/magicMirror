from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Date, Job, Event
from .serializers import (
        DateSerializer, JobSerializer, EventSerializer
)


class DateListView(generics.ListAPIView):
    queryset = Date.objects.all()
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class DateRetrieveView(generics.RetrieveAPIView):
    queryset = Date.objects.all()
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class JobRetrieveView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class EventRetrieveView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'
