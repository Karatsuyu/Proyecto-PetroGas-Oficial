from django.db import models

class Clientes(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.CharField(max_length=3)
    correo = models.EmailField()
    telefono = models.CharField(max_length=20)
    cedula = models.CharField(max_length=15, unique=True)
    user = models.CharField(max_length=50, default="cliente")

    def __str__(self):
        return self.cedula
