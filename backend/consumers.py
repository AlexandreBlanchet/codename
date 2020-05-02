from .models import Player, Game, Round
from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.observer import model_observer

from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin
from django.contrib.auth.models import User
from . import serializers
from djangochannelsrestframework import permissions
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from djangochannelsrestframework.mixins import (
    ListModelMixin,
    PatchModelMixin,
    UpdateModelMixin,
    CreateModelMixin,
    DeleteModelMixin,
)

# import the logging library
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


class GameConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = Game.objects.all()
    serializer_class = serializers.GameSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @action()
    async def start_game(self, pk=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        user = self.scope['user']
        await database_sync_to_async(game.start)(user)
        return None, 200

    @action()
    async def join_team(self, pk=None, team=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        user = self.scope['user']
        await database_sync_to_async(game.join_team)(user, team)
        return None, 200

    @action()
    async def select_leader(self, pk=None, player_id=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        await database_sync_to_async(game.select_leader)(player_id)
        return None, 200

    @action()
    async def remove_player(self, pk=None, player_id=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        user = self.scope['user']
        await database_sync_to_async(game.remove_player)(user, player_id)
        return None, 200

    @action()
    async def submit_word(self, pk=None, word=None, number=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        user = self.scope['user']
        await database_sync_to_async(game.submit_word)(user, word, number)
        return None, 200

    @action()
    async def submit_cell(self, pk=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        user = self.scope['user']
        await database_sync_to_async(game.submit_cell)(user)
        return None, 200

    @action()
    async def stop_round(self, pk=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        user = self.scope['user']
        await database_sync_to_async(game.stop_round)(user)
        return None, 200

    @action()
    async def select_cell(self, pk=None, cell_id=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        user = self.scope['user']
        await database_sync_to_async(game.select_cell)(user, cell_id)
        return None, 200

    async def send_json(self, message):
        if message['data'] and 'cells' in message['data']:
            if not self.is_leader(self.scope['user'], message):
                for cell in message['data']['cells']:
                    if not cell['found']:
                        cell['color'] = 'W'
        await super().send_json(message)
    # Receive message from room group

    def is_leader(self, user, message):
        if message['data'] and message['data']['teams']:
            for team in message['data']['teams']:
                if team['leader'] and team['leader']['user'] and user.username == team['leader']['user']['username']:
                    return True
        return False


class GamesConsumer(ListModelMixin, GenericAsyncAPIConsumer):
    queryset = Game.objects.all().order_by("-pk")
    serializer_class = serializers.GamesSerializer
    permission_classes = (permissions.IsAuthenticated,)

    async def websocket_connect(self, message):
        await super().websocket_connect(message)
        await type(self).model_activity.subscribe(self)

    @model_observer(Game)
    async def model_activity(self, message, observer=None, **kwargs):
        # send activity to your frontend
        logger.info(message)
        if message['action'] in ['create', 'update']:
            game = await database_sync_to_async(self.get_object)(pk=message["pk"])
            message['data'] = serializers.GamesSerializer(game).data
            await self.send_json(message)

    @action()
    def create(self, data, **kwargs):
        game = Game(owner=self.scope['user'])
        serializer = serializers.GamesSerializer(game, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.data, 200
