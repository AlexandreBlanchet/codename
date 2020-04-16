from rest_framework import viewsets
from rest_framework import permissions
from backend import serializers
from .models import Player, Game, Round

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

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
    queryset = Game.objects.all()
    serializer_class = serializers.GameSerializer
    permission_classes = [permissions.IsAuthenticated]

class RoundViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows round to be viewed or edited.
    """
    queryset = Round.objects.all()
    serializer_class = serializers.RoundSerializer
    permission_classes = [permissions.IsAuthenticated]


class LoginView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)