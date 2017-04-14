from django.contrib.auth.models import User, Group
from api.app.models import Team
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from api.app.serializers import UserSerializer, GroupSerializer, TeamSerializer
import logging
import jsonlogging


logger = logging.getLogger("api")
logHandler = logging.StreamHandler()
# You can also use LogstashFormatterV0 or LogstashFormatterV1
formatter = jsonlogging.JSONFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)

class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows teams to be viewed or edited.
    """

    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            teams = Team.objects.filter(Q(team_name__icontains=query)).order_by('team_name')
        else:
            teams = Team.objects.all().order_by('team_name')
        return teams


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            users = User.objects.filter(Q(username__icontains=query)).order_by('username')
        else:
            users = User.objects.all().order_by('username')
        return users


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
