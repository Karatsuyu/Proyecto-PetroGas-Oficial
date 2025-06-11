from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.hashers import make_password

class Compras(models.Model):
    productos = models.CharField(max_length=50, default='categoria')
    cedula = models.IntegerField(validators=[MinValueValidator(0)])
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    valor = models.IntegerField(validators=[MinValueValidator(0)])
    

    def __str__(self):
        return self.cedula
    

class Clientes(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.CharField(max_length=3)
    correo = models.EmailField()
    telefono = models.CharField(max_length=20)
    cedula = models.CharField(max_length=15, unique=True)
    user = models.CharField(max_length=50, default="cliente")

    def __str__(self):
        return self.cedula
    
class Empleados(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    correo = models.EmailField()
    telefono = models.CharField(max_length=20)
    cedula = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=128)  # Para almacenar el hash

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.nombre

class Inventario(models.Model):
    cedula = models.IntegerField(validators=[MinValueValidator(0)])
    productos = models.CharField(max_length=50, default='productos')
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    valor = models.IntegerField(validators=[MinValueValidator(0)])
    
    

    def __str__(self):
        return str(self.cedula)
    
