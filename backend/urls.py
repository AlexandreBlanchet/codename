from django.urls import include
from django.conf.urls import url
from rest_framework import routers
from . import api

router = routers.DefaultRouter()
router.register(r'players', api.PlayerViewSet)
router.register(r'games', api.GameViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'', include(router.urls)),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
