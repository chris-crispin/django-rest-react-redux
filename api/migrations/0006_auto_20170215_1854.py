# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-15 18:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authtoken', '0002_auto_20160226_1747'),
        ('admin', '0002_logentry_remove_auto_add'),
        ('api', '0005_extendeduser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='extendeduser',
            name='user',
        ),
        migrations.DeleteModel(
            name='ExtendedUser',
        ),
    ]
