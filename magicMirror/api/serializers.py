from rest_framework import serializers
from .models import Date, Job, Event


class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = ('id', 'date')


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'date_due', 'title', 'assignee')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'dates', 'end_date',
                  'title', 'location')
