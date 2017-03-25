from django.contrib.auth.models import User, Group
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from api.app.serializers import UserSerializer, GroupSerializer
import logging
import jsonlogging


logger = logging.getLogger("api")
logHandler = logging.StreamHandler()
# You can also use LogstashFormatterV0 or LogstashFormatterV1
formatter = jsonlogging.JSONFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            users = User.objects.filter(Q(username__icontains=query) | Q(email__icontains=query)).order_by('username')
        else:
            users = User.objects.all().order_by('username')
        return users

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(UserSerializer(request.user,
                            context={'request': request}).data)
        return super(UserViewSet, self).retrieve(request, pk)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
