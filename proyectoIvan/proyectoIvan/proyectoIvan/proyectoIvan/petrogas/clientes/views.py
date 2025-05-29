from rest_framework import viewsets
from .models import Clientes
from .serializers import ClientesSerializer

class ClientesViewSet(viewsets.ModelViewSet):
    serializer_class = ClientesSerializer

    def get_queryset(self):
        queryset = Clientes.objects.all()
        cedula = self.request.query_params.get('cedula')

        if cedula:
            queryset = queryset.filter(cedula=cedula)
        
        return queryset
