from django.db import models

# Create your models here.
class Todo(models.Model):
    name = models.CharField(max_length=200)
    description = models.FloatField()
    age = models.IntegerField()

    class Meta:
        ordering = ['name']