# models.py
from django.db import models
from django.contrib.auth.hashers import make_password

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
