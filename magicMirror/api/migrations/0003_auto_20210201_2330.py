# Generated by Django 3.1.5 on 2021-02-01 23:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210131_2304'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='dates',
            new_name='due_dates',
        ),
        migrations.RenameField(
            model_name='job',
            old_name='date',
            new_name='due_date',
        ),
    ]
