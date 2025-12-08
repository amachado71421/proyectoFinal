from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

from . import models, serializers
from .serializers import PerfilSerializer


class ResultadoViewSet(viewsets.ModelViewSet):
    queryset = models.Resultado.objects.all()
    serializer_class = serializers.ResultadoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RolViewSet(viewsets.ModelViewSet):
    queryset = models.Rol.objects.all()
    serializer_class = serializers.RolSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = models.Perfil.objects.all()
    serializer_class = serializers.PerfilSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PalmaresViewSet(viewsets.ModelViewSet):
    queryset = models.Palmares.objects.all()
    serializer_class = serializers.PalmaresSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LogroViewSet(viewsets.ModelViewSet):
    queryset = models.Logro.objects.all()
    serializer_class = serializers.LogroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PerfilLogroViewSet(viewsets.ModelViewSet):
    queryset = models.PerfilLogro.objects.all()
    serializer_class = serializers.PerfilLogroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = models.Categoria.objects.all()
    serializer_class = serializers.CategoriaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RangoEdadViewSet(viewsets.ModelViewSet):
    queryset = models.RangoEdad.objects.all()
    serializer_class = serializers.RangoEdadSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class EventoViewSet(viewsets.ModelViewSet):
    queryset = models.Evento.objects.all()
    serializer_class = serializers.EventoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Guardar evento con usuario autenticado"""
        serializer.save()

    def get_queryset(self):
        """Filtrar eventos por usuario si es necesario"""
        return models.Evento.objects.all()


class EstadoViewSet(viewsets.ModelViewSet):
    queryset = models.Estado.objects.all()
    serializer_class = serializers.EstadoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PerfilEventoViewSet(viewsets.ModelViewSet):
    queryset = models.PerfilEvento.objects.all()
    serializer_class = serializers.PerfilEventoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class EventoCategoriaViewSet(viewsets.ModelViewSet):
    queryset = models.EventoCategoria.objects.all()
    serializer_class = serializers.EventoCategoriaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class EventoRangoEdadViewSet(viewsets.ModelViewSet):
    queryset = models.EventoRangoEdad.objects.all()
    serializer_class = serializers.EventoRangoEdadSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]