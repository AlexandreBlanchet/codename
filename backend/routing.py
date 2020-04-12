# chat/routing.py
from django.conf.urls import url
import typing as tp
from . import consumers


websocket_urlpatterns: tp.List[str] = [
    url(r'ws/users$', consumers.UserConsumer),
    url(r'ws/test',consumers.TestConsumer)
]