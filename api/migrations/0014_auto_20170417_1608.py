# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-04-17 16:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_remove_player_team_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='team_name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
