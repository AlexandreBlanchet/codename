from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import backend.routing
from .token_auth import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        TokenAuthMiddlewareStack(
            URLRouter(
                backend.routing.websocket_urlpatterns
            )
        )
    ),
})
