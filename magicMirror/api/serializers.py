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
        fields = ('id', 'due_date', 'title', 'asignee')


class EventSerializer(serializers.ModelSerializer):
    due_date = DateSerializer()

    class Meta:
        model = Event
        fields = ('id', 'due_date', 'end_date',
                  'title', 'location')
