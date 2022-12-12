from rest_framework.routers import SimpleRouter
from core.user.serializers import PassordCreateViewSet, PassordGenerateViewSet
from core.user.viewsets import UserViewSet, PasswordViewSet
from core.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', UserViewSet, basename='user')

# PASSWORD
routes.register(r'password/view', PasswordViewSet, basename='view')
routes.register(r'password/save', PassordCreateViewSet, basename='save')
routes.register(r'password/generate', PassordGenerateViewSet, basename='generate')



urlpatterns = [
    *routes.urls
]
