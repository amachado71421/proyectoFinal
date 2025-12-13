from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

from . import models, serializers


# ----------------------------------------------------
# RESULTADO
# ----------------------------------------------------
class ResultadoViewSet(viewsets.ModelViewSet):
    queryset = models.Resultado.objects.all()
    serializer_class = serializers.ResultadoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# ROL
# ----------------------------------------------------
class RolViewSet(viewsets.ModelViewSet):
    queryset = models.Rol.objects.all()
    serializer_class = serializers.RolSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# PERFIL
# ----------------------------------------------------
class PerfilViewSet(viewsets.ModelViewSet):
    queryset = models.Perfil.objects.all()
    serializer_class = serializers.PerfilSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# PALMARES
# ----------------------------------------------------
class PalmaresViewSet(viewsets.ModelViewSet):
    queryset = models.Palmares.objects.all()
    serializer_class = serializers.PalmaresSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# LOGRO
# ----------------------------------------------------
class LogroViewSet(viewsets.ModelViewSet):
    queryset = models.Logro.objects.all()
    serializer_class = serializers.LogroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def con_usuarios(self, request):
        """Endpoint personalizado para obtener logros con sus usuarios asociados"""
        logros = self.get_queryset()
        data = []

        for logro in logros:
            perfil_logros = models.PerfilLogro.objects.filter(id_logro=logro.id_logro).select_related('id_perfil')
            usuarios = []
            for pl in perfil_logros:
                perfil = pl.id_perfil
                usuarios.append({
                    'id': perfil.id_perfil,
                    'username': perfil.username,
                    'nombre': f"{perfil.first_name} {perfil.last_name}".strip() or perfil.username,
                    'email': perfil.email
                })

            logro_data = {
                'id_logro': logro.id_logro,
                'nombre_logro': logro.nombre_logro,
                'descripcion_logro': logro.descripcion_logro,
                'fecha_creacion': logro.fecha_creacion,
                'usuarios': usuarios
            }
            data.append(logro_data)

        return Response(data)


# ----------------------------------------------------
# PERFIL LOGRO
# ----------------------------------------------------
class PerfilLogroViewSet(viewsets.ModelViewSet):
    queryset = models.PerfilLogro.objects.all()
    serializer_class = serializers.PerfilLogroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# CATEGORIA
# ----------------------------------------------------
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = models.Categoria.objects.all()
    serializer_class = serializers.CategoriaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# RANGO EDAD
# ----------------------------------------------------
class RangoEdadViewSet(viewsets.ModelViewSet):
    queryset = models.RangoEdad.objects.all()
    serializer_class = serializers.RangoEdadSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# EVENTO
# ----------------------------------------------------
class EventoViewSet(viewsets.ModelViewSet):
    queryset = models.Evento.objects.all()
    serializer_class = serializers.EventoSerializer
    permission_classes = [IsAuthenticated]


# ----------------------------------------------------
# ESTADO
# ----------------------------------------------------
class EstadoViewSet(viewsets.ModelViewSet):
    queryset = models.Estado.objects.all()
    serializer_class = serializers.EstadoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# PERFIL EVENTO (INSCRIPCIÓN CORREGIDA)
# ----------------------------------------------------
class PerfilEventoViewSet(viewsets.ModelViewSet):
    queryset = models.PerfilEvento.objects.all()
    serializer_class = serializers.PerfilEventoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    lookup_field = None  # Muy importante: evita que DRF intente usar PK inexistente

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Manejar id_rol opcional
        if not data.get("id_rol") or data["id_rol"] in ["", "null"]:
            data["id_rol"] = None

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        perfil = serializer.validated_data["id_perfil"]
        evento = serializer.validated_data["id_evento"]

        # Previene duplicados
        if models.PerfilEvento.objects.filter(id_perfil=perfil, id_evento=evento).exists():
            return Response(
                {"detail": "Este perfil ya está inscrito en este evento."},
                status=status.HTTP_400_BAD_REQUEST
            )

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # ----------------------------------------------------
    # DELETE custom — 100% compatible con tu frontend
    # ----------------------------------------------------
    @action(detail=False, methods=["delete"])
    def cancelar(self, request):
        id_perfil = request.query_params.get("id_perfil")
        id_evento = request.query_params.get("id_evento")

        if not id_perfil or not id_evento:
            return Response(
                {"detail": "Debe enviar id_perfil y id_evento."},
                status=status.HTTP_400_BAD_REQUEST
            )

        inscripcion = models.PerfilEvento.objects.filter(
            id_perfil=id_perfil,
            id_evento=id_evento
        ).first()

        if not inscripcion:
            return Response(
                {"detail": "No existe esta inscripción."},
                status=status.HTTP_404_NOT_FOUND
            )

        inscripcion.delete()
        return Response({"detail": "Inscripción eliminada correctamente."},
                        status=status.HTTP_200_OK)


# ----------------------------------------------------
# EVENTO CATEGORIA
# ----------------------------------------------------
class EventoCategoriaViewSet(viewsets.ModelViewSet):
    queryset = models.EventoCategoria.objects.all()
    serializer_class = serializers.EventoCategoriaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# ----------------------------------------------------
# EVENTO RANGO EDAD
# ----------------------------------------------------
class EventoRangoEdadViewSet(viewsets.ModelViewSet):
    queryset = models.EventoRangoEdad.objects.all()
    serializer_class = serializers.EventoRangoEdadSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
