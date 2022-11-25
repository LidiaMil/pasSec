from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(req):
    return HttpResponse("<h5>Hiiiiii</h5>")

def about(req):
    return HttpResponse("<h6>About us</h6>")