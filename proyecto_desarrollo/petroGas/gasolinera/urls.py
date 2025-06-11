from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientesViewSet
from .views import ComprasViewSet
from .views import EmpleadosViewSet
from .views import InventarioViewSet


router = DefaultRouter()
router.register(r'Clientes', ClientesViewSet, basename='Cliente')
router.register(r'Compras', ComprasViewSet, basename='Compras')
router.register(r'Empleados', EmpleadosViewSet, basename='Empleado')
router.register(r'Inventario', InventarioViewSet, basename='Inventario')


urlpatterns = [
    path('', include(router.urls)),
]