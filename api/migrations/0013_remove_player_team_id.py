# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-04-17 14:20
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20170417_1418'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='team_id',
        ),
    ]
