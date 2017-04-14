from __future__ import unicode_literals

from django.db import models

class Team(models.Model):
    team_name = models.CharField(max_length=100)
    stadium_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
