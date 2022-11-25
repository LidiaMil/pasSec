from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='settings'),
    path('about', views.about, name='about'),
]
