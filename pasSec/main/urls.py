from django.urls import path, include
from . import views
from authentication.views import LoginAPIView

urlpatterns = [
    path('', views.index, name='settings'),
    path('about', views.about, name='about'),
    path('create', views.create, name='create'),
    path('register', views.register, name='register'),
]
