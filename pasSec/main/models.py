from django.db import models

# Create your models here.

class Users(models.Model):
    email = models.EmailField('email')
    password = models.TextField('password')

    def __str__(self):
        return self.email
