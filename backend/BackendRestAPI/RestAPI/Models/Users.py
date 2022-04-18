from django.db import models
from django_mysql.models import ListCharField

# Create your models here.
class User(models.Model):
    email = models.EmailField(primary_key=True,max_length=200)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    age = models.IntegerField()
    friendlist = ListCharField(
        models.CharField(max_length=200),
        max_length=1000,
        null = True
    )

    class Meta:
        ordering = ['name']