from core.user.models import Method, Password, User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']

class MethodSerializer(serializers.ModelSerializer):

    class Meta:
        model = Method
        fields = ['id', 'name', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']


class PasswordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Password
        fields = ['id', 'site', 'username', 'password', 'created', 'updated']
        read_only_field = ['created', 'updated']

