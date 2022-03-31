from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(primary_key=True,max_length=200)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    age = models.IntegerField()

    class Meta:
        ordering = ['name']