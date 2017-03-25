from django.contrib.auth.models import User, Group
from models import Synonym
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined', 'first_name',
                  'last_name', 'is_staff', 'is_active', 'is_superuser')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class SynonymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Synonym
        fields = ('id', 'lhs', 'rhs', 'type', 'date_added', 'last_modified',
                  'user_added', 'user_last_modified')
