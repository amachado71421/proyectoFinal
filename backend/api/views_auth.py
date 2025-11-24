from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.conf import settings

# -----------------------------
# CSRF
# -----------------------------
@ensure_csrf_cookie
@api_view(['GET'])
def get_csrf_token(request):
    """
    GET /api/csrf/ -> setea la cookie CSRF
    """
    return Response({'message': 'CSRF cookie set'})


# -----------------------------
# Login con JWT en cookies HttpOnly
# -----------------------------
class CookieTokenObtainPairView(TokenObtainPairView):
    """
    POST /api/token/ -> genera access y refresh tokens y los setea como cookies HttpOnly
    """
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access = response.data.get('access')
            refresh = response.data.get('refresh')

            # Opcional: ocultar los tokens en el body
            response.data = {'message': 'Token set in HttpOnly cookie'}

            # Ajusta dominio y flags según tu entorno
            domain = 'localhost'  # 👈 usa el mismo host que tu frontend
            secure = not settings.DEBUG
            samesite = 'Lax'

            # Access token (15 minutos)
            response.set_cookie(
                key='access_token',
                value=access,
                httponly=True,
                secure=secure,
                samesite=samesite,
                path='/',
                domain=domain,
                max_age=15 * 60
            )

            # Refresh token (7 días)
            response.set_cookie(
                key='refresh_token',
                value=refresh,
                httponly=True,
                secure=secure,
                samesite=samesite,
                path='/',
                domain=domain,
                max_age=7 * 24 * 60 * 60
            )

        return response


# -----------------------------
# Logout
# -----------------------------
class LogoutAPIView(APIView):
    """
    POST /api/logout/ -> elimina las cookies de sesión
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        domain = 'localhost'  # 👈 debe coincidir con el usado en login
        response = Response({'message': 'Sesión cerrada'}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token', path='/', domain=domain)
        response.delete_cookie('refresh_token', path='/', domain=domain)
        return response
