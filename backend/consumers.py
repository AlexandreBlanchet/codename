from .models import Player
from .serializers import PlayerSerializer
from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin
from django.contrib.auth.models import User
from .serializers import UserSerializer
from djangochannelsrestframework import permissions
from django.contrib.auth import get_user_model



class UserConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
        queryset = User.objects.all()
        serializer_class = UserSerializer
        permission_classes = (permissions.IsAuthenticated,) 

class TestConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer