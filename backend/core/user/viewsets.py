from core.user.serializers import UserSerializer, MethodSerializer, PasswordSerializer
from core.user.models import User, Password, Method
from django.core.exceptions import BadRequest
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.response import Response

from .encode_decode import ENCODING_METHODS, DECODING_METHODS


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


class PasswordViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = PasswordSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']
    def get_queryset(self):
        return Password.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Password.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    @action(methods='put', detail=True)
    def encode(self):
        obj = self.get_object()
        try:
            new_password = ENCODING_METHODS[self.request.data](obj.password)
            obj.password = new_password
            obj.save()
            return Response(status=status.HTTP_200_OK)
        except KeyError:
            raise BadRequest({
                'msg': 'Ошибка кодирования пароля'
            })

    @action(methods='put', detail=True)
    def decode(self):
        obj = self.get_object()
        try:
            new_password = DECODING_METHODS[self.request.data](obj.password)
            obj.password = new_password
            obj.save()
            return Response(status=status.HTTP_200_OK)
        except KeyError:
            raise BadRequest({
                'msg': 'Ошибка декодирования пароля'
            })


class MethodViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = MethodSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        return Method.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Method.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
