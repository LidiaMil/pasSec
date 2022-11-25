from django.db import models

# Create your models here.

class User(models.Model):
    id = models.UUIDField('id', primary_key=True)
    email = models.EmailField('email')
    password = models.TextField('password')

    def __str__(self):
        return self.email