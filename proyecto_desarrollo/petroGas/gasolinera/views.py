from rest_framework import viewsets
from .models import Clientes
from .serializers import ClientesSerializer
from .models import Inventario
from .serializers import InventarioSerializer
from .models import Empleados
from .serializers import EmpleadosSerializer
from .models import Compras
from .serializers import ComprasSerializer


class ClientesViewSet(viewsets.ModelViewSet):
    serializer_class = ClientesSerializer

    def get_queryset(self):
        queryset = Clientes.objects.all()
        cedula = self.request.query_params.get('cedula')

        if cedula:
            queryset = queryset.filter(cedula=cedula)
        
        return queryset
    
class ComprasViewSet(viewsets.ModelViewSet):
    queryset = Compras.objects.all()
    serializer_class = ComprasSerializer

class EmpleadosViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadosSerializer

    def get_queryset(self):
        queryset = Empleados.objects.all()
        cedula = self.request.query_params.get('cedula')

        if cedula:
            queryset = queryset.filter(cedula=cedula)
        
        return queryset
    
class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer
    lookup_field = 'productos' 