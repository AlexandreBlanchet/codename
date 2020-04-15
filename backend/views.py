from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from backend import serializers
from .models import Player, Game, Round


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

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
    serializer_class = serializers.Roundserialize
    permission_classes = [permissions.IsAuthenticated]