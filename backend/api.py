from rest_framework import viewsets
from rest_framework import permissions
from backend import serializers
from .models import Player, Game, Round

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView


# import the logging library
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows player to be viewed or edited.
    """
    queryset = Player.objects.all()
    serializer_class = serializers.PlayerSerializer
    permission_classes = [permissions.IsAuthenticated]


class GameViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows game to be viewed or edited.
    """
    queryset = Game.objects.all().order_by("-pk")
    serializer_class = serializers.GameSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        game = Game(owner=request.user)
        serializer = self.get_serializer(game, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class RoundViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows round to be viewed or edited.
    """
    queryset = Round.objects.all()
    serializer_class = serializers.RoundSerializer
    permission_classes = [permissions.IsAuthenticated]
