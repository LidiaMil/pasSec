from core.user.serializers import UserSerializer,MethodSerializer, PasswordSerializer
from core.user.models import User, Password, Method
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters


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