from __future__ import print_function
from django.contrib.auth.models import User, Group
from api.app.models import Team, Player
from rest_framework import serializers

class TeamSerializer(serializers.ModelSerializer):
    players = serializers.StringRelatedField(many=True)
    class Meta:
        model = Team
        fields = ('id', 'team_name', 'stadium_name', 'location', 'players')

class PlayerSerializer(serializers.ModelSerializer):
    # team = serializers.StringRelatedField()
    class Meta:
        model = Player
        fields = ('id', 'name', 'team', 'position', 'nationality', 'shirt_number')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email',
        'is_staff', 'is_active', 'is_superuser', 'password')
        extra_kwargs = {
            'password': {'write_only': True,
                         'required': False}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for field in UserSerializer.Meta.fields:
            if field != 'id' and field in validated_data:
                setattr(instance, field, validated_data[field])
        # if 'password' in validated_data:
        #     instance.set_password(validated_data['password'])
        instance.save()
        return instance


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
