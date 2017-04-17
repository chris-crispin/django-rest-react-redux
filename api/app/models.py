from __future__ import unicode_literals

from django.db import models

POSITIONS = ('GoalKeeper', 'Defender', 'Midfielder', 'Forward')

class Team(models.Model):
    team_name = models.CharField(max_length=100, unique=True)
    stadium_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __unicode__(self):
        return '{0}'.format(self.team_name)


class Player(models.Model):
    team = models.ForeignKey(Team, related_name='players', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    nationality = models.CharField(max_length=100)
    position = models.CharField(choices=POSITIONS, max_length=100)
    shirt_number = models.CharField(max_length=2)

    class Meta:
        unique_together = ('team', 'name')

    def __unicode__(self):
        return '{0}. {1}'.format(self.shirt_number, self.name)
