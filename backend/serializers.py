from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Player, Game, Round, Cell


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['user', 'team']


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['pk', 'status', 'cells', 'players']
        depth = 1

# this serializer is used when we need to monitor status of all games


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['pk', 'status']


class RoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = ['pk', 'game', 'word', 'number_of_cells']
        depth = 1
