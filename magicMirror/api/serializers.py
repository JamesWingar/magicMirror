from rest_framework import serializers
from .models import Date, Job, Event


class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = ('id', 'date')


class JobSerializer(serializers.ModelSerializer):
    due_date = DateSerializer()

    class Meta:
        model = Job
        fields = ('id', 'due_date', 'title', 'assignee')


class EventSerializer(serializers.ModelSerializer):
    start_date = DateSerializer()

    class Meta:
        model = Event
        fields = ('id', 'start_date', 'start_time',
                  'length', 'end_date', 'title')
