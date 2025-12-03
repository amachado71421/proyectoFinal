from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

from . import models, serializers
from .serializers import PerfilSerializer


class ResultadoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Resultado.objects.all()
    serializer_class = serializers.ResultadoSerializer
    permission_classes = [AllowAny]


class RolViewSet(viewsets.ModelViewSet):
    queryset = models.Rol.objects.all()
    serializer_class = serializers.RolSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


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


class EstadoViewSet(viewsets.ModelViewSet):
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