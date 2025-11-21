from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.conf import settings
from datetime import timedelta

# 🔐 Vista para obtener el token CSRF y setearlo como cookie
@ensure_csrf_cookie
@api_view(['GET'])
def get_csrf_token(request):
    return Response({'message': 'CSRF cookie set'})

# 🔐 Vista personalizada para emitir el JWT como cookies HttpOnly
class CookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access = response.data.get('access')
            refresh = response.data.get('refresh')

            # Opcional: ocultar los tokens del body
            response.data = {'message': 'Token set in HttpOnly cookie'}

            # Setea las cookies
            response.set_cookie(
                key='access_token',
                value=access,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=15 * 60  # 15 minutos
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=7 * 24 * 60 * 60  # 7 días
            )

        return response

# 🔐 Vista para cerrar sesión eliminando las cookies
class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = Response({'message': 'Sesión cerrada'}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
