from django.db import models
from django.core.validators import MinValueValidator


class Inventario(models.Model):
    cedula = models.IntegerField(validators=[MinValueValidator(0)])
    productos = models.CharField(max_length=50, default='productos')
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    valor = models.IntegerField(validators=[MinValueValidator(0)])
    
    

    def __str__(self):
        return str(self.cedula)

