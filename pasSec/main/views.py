from django.shortcuts import render
from .models import Users
from .forms import UsersForm
# Create your views here.

def index(req):
    users = Users.objects.all()
    return render(req, "main/index.html", { 'title': 'Users All', 'Users': users})

def about(req):
    return render(req,"main/about.html")

def create(req):
    error = ''
    if req.method == 'POST':
        form = UsersForm(req.POST)
        print(req.POST)
        if form.is_valid():
            form.save()
        else:
            error = 'invalid'


    form = UsersForm()
    context = {
        'form': form,
        'error': error
    }
    return render(req,"main/create.html", context)