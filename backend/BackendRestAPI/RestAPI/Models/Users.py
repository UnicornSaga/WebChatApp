from django.db import models
from django_mysql.models import ListCharField

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=200)
    name = models.CharField(max_length=200, default="John Doe")
    description = models.CharField(max_length=500, default="HelloWorld")
    age = models.IntegerField(default=18)
    friendlist = ListCharField(
        models.CharField(max_length=200),
        max_length=1000,
        null = True
    )

    def __init__(self, email, name, description, age, friendlist):
        self.email = email
        self.name = name
        self.description = description
        self.age = age
        self.friendlist = friendlist

    class Meta:
        ordering = ['id']