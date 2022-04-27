from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Auth0User(models.Model):
    username = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username
