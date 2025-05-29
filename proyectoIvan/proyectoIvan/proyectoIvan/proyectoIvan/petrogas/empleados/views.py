from rest_framework import viewsets
from .models import Empleados
from .serializers import EmpleadosSerializer

class EmpleadosViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadosSerializer

    def get_queryset(self):
        queryset = Empleados.objects.all()
        cedula = self.request.query_params.get('cedula')

        if cedula:
            queryset = queryset.filter(cedula=cedula)
        
        return queryset
