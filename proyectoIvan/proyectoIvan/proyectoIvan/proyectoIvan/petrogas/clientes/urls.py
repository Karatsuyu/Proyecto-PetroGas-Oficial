from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientesViewSet

router = DefaultRouter()
router.register(r'Clientes', ClientesViewSet, basename='Cliente')

urlpatterns = [
    path('', include(router.urls)),
]