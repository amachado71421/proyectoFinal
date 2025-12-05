from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.conf import settings

from . import models, serializers
from .serializers import PerfilSerializer

# -----------------------------
# CSRF
# -----------------------------
@ensure_csrf_cookie
@api_view(['GET'])
def get_csrf_token(request):
    """Obtener token CSRF"""
    return Response({'message': 'CSRF cookie set'})


# -----------------------------
# Cookie token obtain / refresh
# -----------------------------
class CookieTokenObtainPairView(TokenObtainPairView):
    """Obtener tokens JWT y guardarlos en cookies HttpOnly"""
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access = response.data.get('access')
            refresh = response.data.get('refresh')

            response.data = {'message': 'Tokens guardados en cookies seguras'}

            secure = not settings.DEBUG
            samesite = 'Lax'

            # Cookie de acceso (15 minutos)
            response.set_cookie(
                key='access_token',
                value=access,
                httponly=True,
                secure=secure,
                samesite=samesite,
                path='/',
                max_age=15 * 60
            )

            # Cookie de refresco (7 días)
            response.set_cookie(
                key='refresh_token',
                value=refresh,
                httponly=True,
                secure=secure,
                samesite=samesite,
                path='/',
                max_age=7 * 24 * 60 * 60
            )

        return response


class CookieTokenRefreshView(TokenRefreshView):
    """Refrescar token JWT desde cookie"""
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"detail": "No hay refresh token en cookie"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if 'access' in data:
            access = data['access']
            response = Response({"message": "Token de acceso refrescado"}, status=status.HTTP_200_OK)

            secure = not settings.DEBUG
            samesite = 'Lax'

            response.set_cookie(
                key='access_token',
                value=access,
                httponly=True,
                secure=secure,
                samesite=samesite,
                path='/',
                max_age=15 * 60
            )
            return response

        return Response({"detail": "No se generó token de acceso"}, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Register (con cookies)
# -----------------------------
class RegisterAPIView(APIView):
    """Registrar nuevo usuario"""
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = serializers.RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        response = Response({
            "user": PerfilSerializer(user).data,
            "message": "Registro exitoso"
        }, status=status.HTTP_201_CREATED)

        secure = not settings.DEBUG
        samesite = 'Lax'

        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=secure,
            samesite=samesite,
            path='/',
            max_age=15 * 60
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=secure,
            samesite=samesite,
            path='/',
            max_age=7 * 24 * 60 * 60
        )
        return response


# -----------------------------
# Login (con cookies)
# -----------------------------
class LoginAPIView(APIView):
    """Iniciar sesión y guardar tokens en cookies"""
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = serializers.LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        response = Response({
            "user": PerfilSerializer(user).data,
            "message": "Login exitoso"
        }, status=status.HTTP_200_OK)

        secure = not settings.DEBUG
        samesite = 'Lax'

        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=secure,
            samesite=samesite,
            path='/',
            max_age=15 * 60
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=secure,
            samesite=samesite,
            path='/',
            max_age=7 * 24 * 60 * 60
        )
        return response


# -----------------------------
# Me (datos del usuario autenticado)
# -----------------------------
class MeAPIView(APIView):
    """Obtener datos del usuario autenticado"""
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        if not user or not user.is_authenticated:
            return Response(
                {"detail": "No autenticado"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(PerfilSerializer(user).data, status=status.HTTP_200_OK)


# -----------------------------
# Logout
# -----------------------------
class LogoutAPIView(APIView):
    """Cerrar sesión eliminando cookies"""
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = Response(
            {'message': 'Sesión cerrada exitosamente'},
            status=status.HTTP_200_OK
        )
        response.delete_cookie('access_token', path='/')
        response.delete_cookie('refresh_token', path='/')
        return response


# -----------------------------
# Promote / Demote users (admins only)
# -----------------------------
class PromoteUserAPIView(APIView):
    """Promover o degradar privilegios de usuario (solo administradores)"""
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        uid = request.data.get('id_perfil') or request.data.get('id') or request.data.get('username')
        if not uid:
            return Response(
                {"detail": "id_perfil, id o username requerido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            if isinstance(uid, str) and not uid.isdigit():
                user = models.Perfil.objects.get(username=uid)
            else:
                user = models.Perfil.objects.get(id_perfil=uid)
        except models.Perfil.DoesNotExist:
            return Response(
                {"detail": "Usuario no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Actualizar permisos
        if 'is_staff' in request.data:
            user.is_staff = bool(request.data.get('is_staff'))
        if 'is_superuser' in request.data:
            user.is_superuser = bool(request.data.get('is_superuser'))

        user.save()
        return Response(PerfilSerializer(user).data, status=status.HTTP_200_OK)