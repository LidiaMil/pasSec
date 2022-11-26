from django.db import models

# Create your models here.

class Users(models.Model):
    email = models.EmailField('email')
    password = models.TextField('password')

    def __str__(self):
        return self.email

# class Methods(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField('name', max_length = 250)

#     def __str__(self):
#         return self.name

# class Passwords(models.Model):
#     site = models.CharField('site', max_length = 250)
#     username = models.CharField('username', max_length = 60)
#     password = models.CharField('password', max_length = 60)
#     username = models.CharField('username')
#     user = models.ForeignKey(Users, on_delete=models.CASCADE)
#     method = models.ForeignKey(Methods, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.site
