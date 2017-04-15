from __future__ import unicode_literals

from django.db import models

class Team(models.Model):
    team_name = models.CharField(max_length=100)
    stadium_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __unicode__(self):
        return '{0}'.format(self.team_name)


class Player(models.Model):
    team = models.ForeignKey(Team, related_name='players', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    nationality = models.CharField(max_length=100)
    position = models.CharField(max_length=100)

    class Meta:
        unique_together = ('team', 'name')

    def __unicode__(self):
        return '{0}'.format(self.title)
