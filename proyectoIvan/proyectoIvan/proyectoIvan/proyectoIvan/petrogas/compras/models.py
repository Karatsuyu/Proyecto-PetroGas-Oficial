from django.db import models
from django.core.validators import MinValueValidator


class Compras(models.Model):
    productos = models.CharField(max_length=50, default='categoria')
    cedula = models.IntegerField(validators=[MinValueValidator(0)])
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    valor = models.IntegerField(validators=[MinValueValidator(0)])
    

    def __str__(self):
        return self.cedula

