from .models import Users
from django.forms import ModelForm, TextInput

class UsersForm(ModelForm):
    class Meta:
        model = Users
        fields =['email','password']
        widgets = {
            "email": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'email',
            }),
            "password": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'password',
            }),
        }