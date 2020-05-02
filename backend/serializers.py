from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Player, Game, Round, Cell, Team

# import the logging library
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


class UserSerialize(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerialize()

    class Meta:
        model = Player
        fields = ['id', 'user', 'cell']


class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, required=False)
    leader = PlayerSerializer(required=False)

    class Meta:
        model = Team
        fields = ['id', 'leader', 'color', 'players']


class CellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cell
        fields = ['id', 'word', 'color', 'found', 'players']
        depth = 2


class GameSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True, required=False)
    owner = UserSerialize(required=False)
    cells = CellSerializer(many=True, required=False)

    class Meta:
        model = Game
        fields = ['id', 'status', 'cells', 'teams', 'owner', 'rounds']
        depth = 1

    def create(self, validated_data):
        logger.info(validated_data)
        return Game.objects.create(**validated_data)
# this serializer is used when we need to monitor status of all games


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'status', 'date_created']
