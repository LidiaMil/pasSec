from core.user.models import Method, Password, User
from rest_framework import serializers
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
import random
import string
from .encode_decode import ENCODING_METHODS, DECODING_METHODS


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
        fields = ['id', 'site', 'username', 'password', 'user_id','method_id','created', 'updated']
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
        print(Method.objects.get(name=request.data['method_id']))

        #тут метод для хэширования пароля вызывается
        serializer = self.serializer_class(data=request.data)
        password = ENCODING_METHODS[self.request.data['method_id']](serializer.data)

        if(request.data['method_id'] == 'add_str'): request.data['method_id'] = '5'
        elif(request.data['method_id'] == 'vernam'): request.data['method_id'] = '4'
        elif(request.data['method_id'] == 'cesar'): request.data['method_id'] = '3'
        print(serializer,'-------',request.data)
        serializer.is_valid(raise_exception=True)
        print('-------')
        #password = serializer.save()
        print(password,'password')

        return Response({
            "password": serializer.data,
        }, status=status.HTTP_201_CREATED)

class PassordGenerateViewSet(ViewSet):
    serializer_class = PasswordSaveSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        #тут метод для хэширования пароля вызывается
        print(request.data['checkedState'],'request')
        SpecialSymbols = '!"#$%&()*+,-./:;=?@[\]^_`|~'
        dictionary = ''

        if(request.data['checkedState'][0] == True): dictionary += string.digits
        if(request.data['checkedState'][1] == True): dictionary += string.ascii_lowercase
        if(request.data['checkedState'][2] == True): dictionary += string.ascii_uppercase
        if(request.data['checkedState'][3] == True): dictionary += SpecialSymbols

        passwords = []
        for i in range(request.data['count']):
            if(request.data['checkedState'][4] == False):  passwords.append( ''.join(random.choice(dictionary) for i in range(request.data['length'])))
            if(request.data['checkedState'][4] == True):  passwords.append( ''.join(random.sample(dictionary, request.data['length'])))
        

        return Response(passwords, status=status.HTTP_201_CREATED)


class PassordDeleteViewSet(ViewSet):
    serializer_class = PasswordSaveSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        print(request.data,'request')
        print(Password.objects.get(pk=request.data['id']))

        return Response(request.data, status=status.HTTP_201_CREATED)

class PassordUpdateViewSet(ViewSet):
    serializer_class = PasswordSaveSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        print(request.data,'request')
        print(Password.objects.get(pk=request.data['id']))



        return Response(request.data, status=status.HTTP_201_CREATED)