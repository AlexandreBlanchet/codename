from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Player, Game, Round

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['user', 'team']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['pk', 'status', 'cell_set']
        depth = 2

# this serializer is used when we need to monitor status of all games

class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['pk', 'status']

class Roundserialize(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = ['pk', 'game', 'word', 'number_of_cells']
        depth = 1