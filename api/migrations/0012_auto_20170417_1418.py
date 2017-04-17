# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-04-17 14:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20170415_1638'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='team_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='players', to='api.Team'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='player',
            name='position',
            field=models.CharField(choices=['GoalKeeper', 'Defender', 'Midfielder', 'Forward'], max_length=100),
        ),
    ]
