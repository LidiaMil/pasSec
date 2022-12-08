from core.user.models import Method, Password, User
from rest_framework import serializers
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters


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

class PasswordSaveSerializer(PasswordSerializer):
    class Meta:
        model = Password
        fields = ['id', 'site', 'username', 'password', 'user_id','method_id','created', 'updated']
        read_only_field = ['created', 'updated']
    


class PassordCreateViewSet(ViewSet):
    serializer_class = PasswordSaveSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        print(serializer,'-------',request.data)
        serializer.is_valid(raise_exception=True)
        print('-------')
        password = serializer.save()
        print(password,'password')

        return Response({
            "password": serializer.data,
        }, status=status.HTTP_201_CREATED)