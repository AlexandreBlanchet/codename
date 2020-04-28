from channels.auth import AuthMiddlewareStack
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from channels.db import database_sync_to_async
from rest_framework.exceptions import AuthenticationFailed

from channels.middleware import BaseMiddleware

# import the logging library
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    """
    Kept that message because....
    Yeah, this is black magic:
    https://github.com/django/channels/issues/1399
    """

    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        knoxAuth = TokenAuthentication()
        try:
            user, auth_token = await database_sync_to_async(knoxAuth.authenticate_credentials)(self.scope['query_string'])
            self.scope['user'] = user
        except AuthenticationFailed:
            self.scope['user'] = AnonymousUser()
        inner = self.inner(self.scope)
        inner = await inner(receive, send)
        return inner

def TokenAuthMiddlewareStack(inner): return TokenAuthMiddleware(
    AuthMiddlewareStack(inner))
