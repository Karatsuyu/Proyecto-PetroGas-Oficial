from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmpleadosViewSet

router = DefaultRouter()
router.register(r'Empleados', EmpleadosViewSet, basename='Empleado')

urlpatterns = [
    path('', include(router.urls)),
]