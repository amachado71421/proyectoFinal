from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from . import models
from . import serializers


class ResultadoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Resultado.objects.all()
    serializer_class = serializers.ResultadoSerializer
    permission_classes = [AllowAny]


class RolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Rol.objects.all()
    serializer_class = serializers.RolSerializer
    permission_classes = [AllowAny]


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = models.Perfil.objects.all()
    serializer_class = serializers.PerfilSerializer
    permission_classes = [AllowAny]


class PalmaresViewSet(viewsets.ModelViewSet):
    queryset = models.Palmares.objects.all()
    serializer_class = serializers.PalmaresSerializer
    permission_classes = [AllowAny]


class LogroViewSet(viewsets.ModelViewSet):
    queryset = models.Logro.objects.all()
    serializer_class = serializers.LogroSerializer
    permission_classes = [AllowAny]


class PerfilLogroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.PerfilLogro.objects.all()
    serializer_class = serializers.PerfilLogroSerializer
    permission_classes = [AllowAny]


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Categoria.objects.all()
    serializer_class = serializers.CategoriaSerializer
    permission_classes = [AllowAny]


class RangoEdadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.RangoEdad.objects.all()
    serializer_class = serializers.RangoEdadSerializer
    permission_classes = [AllowAny]


class EventoViewSet(viewsets.ModelViewSet):
    queryset = models.Evento.objects.all()
    serializer_class = serializers.EventoSerializer
    permission_classes = [AllowAny]


class EstadoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Estado.objects.all()
    serializer_class = serializers.EstadoSerializer
    permission_classes = [AllowAny]


class PerfilEventoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.PerfilEvento.objects.all()
    serializer_class = serializers.PerfilEventoSerializer
    permission_classes = [AllowAny]


class EventoCategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.EventoCategoria.objects.all()
    serializer_class = serializers.EventoCategoriaSerializer
    permission_classes = [AllowAny]


class EventoRangoEdadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.EventoRangoEdad.objects.all()
    serializer_class = serializers.EventoRangoEdadSerializer
    permission_classes = [AllowAny]


#JWT / Auth endpoints


class RegisterAPIView(APIView):
    """
    POST /api/auth/register/
    devuelve access + refresh + datos del user creado
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = serializers.RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": serializers.PerfilSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    """
    POST /api/auth/login/
    recibe { email, password } y devuelve access + refresh + user
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": serializers.PerfilSerializer(user).data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class MeAPIView(APIView):
    """
    GET /api/auth/me/ -> datos del usuario autenticado
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(serializers.PerfilSerializer(request.user).data, status=status.HTTP_200_OK)