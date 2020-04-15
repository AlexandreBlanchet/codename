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

class UserConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated,) 

class GameConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = Game.objects.all()
    serializer_class = serializers.GameSerializer
    permission_classes = (permissions.IsAuthenticated,) 

    @action()
    async def update_status(self, pk=None, status=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        game.status = status
        await database_sync_to_async(game.save)()
        return {"pk": pk}, 200

    @action()
    async def start_game(self, pk=None, **kwargs):
        game = await database_sync_to_async(self.get_object)(pk=pk)
        await database_sync_to_async(game.start)()
        return {"pk": pk}, 200

class RoundConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = Round.objects.all()
    serializer_class = serializers.Roundserialize
    permission_classes = (permissions.IsAuthenticated,)

    @action()
    async def create(self, game_id=None, word='', number_of_cells=1, **kwargs):
        game = await database_sync_to_async(Game.objects.all())(pk=game_id)

# TODO filter only game that has been updated today
class GamesConsumer(ListModelMixin, GenericAsyncAPIConsumer):
    queryset = Game.objects.all()
    serializer_class = serializers.GamesSerializer
    permission_classes = (permissions.IsAuthenticated,)

    async def websocket_connect(self, message):
        await super().websocket_connect(message)
        await type(self).model_activity.subscribe(self)

    @model_observer(Game)
    async def model_activity(self, message, observer=None, **kwargs):
        # send activity to your frontend
        if message['action'] == 'create':
            await self.send_json(message)
