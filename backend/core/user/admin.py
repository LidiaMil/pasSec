from django.contrib import admin
from .models import User,Password,Method

admin.site.register(User)
admin.site.register(Method)
admin.site.register(Password)