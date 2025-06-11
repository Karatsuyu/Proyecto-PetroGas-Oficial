from rest_framework import serializers
from .models import Clientes
from .models import Compras
from .models import Empleados
from .models import Inventario


class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = '__all__'

class ComprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compras
        fields = '__all__'

class EmpleadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleados
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'
