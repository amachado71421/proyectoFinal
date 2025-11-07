from rest_framework import serializers
from . import models


class ResultadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resultado
        fields = '__all__'


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rol
        fields = '__all__'


class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Perfil
        fields = '__all__'


class PalmaresSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Palmares
        fields = '__all__'


class LogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Logro
        fields = '__all__'


class PerfilLogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerfilLogro
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Categoria
        fields = '__all__'


class RangoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RangoEdad
        fields = '__all__'


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Evento
        fields = '__all__'


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Estado
        fields = '__all__'


class PerfilEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerfilEvento
        fields = '__all__'


class EventoCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventoCategoria
        fields = '__all__'


class EventoRangoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventoRangoEdad
        fields = '__all__'
