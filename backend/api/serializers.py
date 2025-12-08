from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from . import models

Perfil = get_user_model()


class ResultadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resultado
        fields = ['id_resultado', 'estado_resultado']


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rol
        fields = ['id_rol', 'nombre_rol']


class PerfilSerializer(serializers.ModelSerializer):
    id_perfil = serializers.IntegerField(read_only=True)

    class Meta:
        model = Perfil
        fields = [
            'id_perfil', 'username', 'email', 'first_name', 'last_name',
            'url_imagen', 'peso_kg', 'altura', 'id_rol',
            'is_active', 'is_staff', 'is_superuser'
        ]
        read_only_fields = ['is_active', 'is_staff', 'is_superuser']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Perfil
        fields = ['username', 'email', 'password', 'password_confirm',
                  'first_name', 'last_name', 'url_imagen', 'peso_kg', 'altura', 'id_rol']

    def validate_email(self, value):
        if Perfil.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def validate(self, data):
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        password = validated_data.pop('password')
        username = validated_data.get('username') or validated_data.get('email')
        user = Perfil.objects.create_user(username=username, email=validated_data.get('email'), password=password)
        # asignar campos opcionales
        for attr in ('first_name', 'last_name', 'url_imagen', 'peso_kg', 'altura', 'id_rol'):
            if attr in validated_data and validated_data[attr] is not None:
                setattr(user, attr, validated_data[attr])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = None
        if email:
            user = Perfil.objects.filter(email__iexact=email).first()
        if not user:
            raise serializers.ValidationError("Email o contraseña inválidos.")
        if not user.check_password(password):
            raise serializers.ValidationError("Email o contraseña inválidos.")
        if not user.is_active:
            raise serializers.ValidationError("Cuenta inactiva.")
        data['user'] = user
        return data


class PalmaresSerializer(serializers.ModelSerializer):
    # Aceptar PKs para las relaciones y validarlas
    id_perfil = serializers.PrimaryKeyRelatedField(queryset=models.Perfil.objects.all())
    id_resultado = serializers.PrimaryKeyRelatedField(queryset=models.Resultado.objects.all())

    class Meta:
        model = models.Palmares
        fields = ['id_palmares', 'id_perfil', 'id_resultado']


class LogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Logro
        fields = ['id_logro', 'nombre_logro', 'descripcion_logro', 'fecha_creacion']


class PerfilLogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerfilLogro
        fields = ['id_perfil', 'id_logro', 'fecha_asignacion', 'comentarios_logro']


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Categoria
        fields = ['id_categoria', 'nombre_categoria']


class RangoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RangoEdad
        fields = ['id_rango_edad', 'nombre_rango_edad', 'edad_minima', 'edad_maxima']


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Estado
        fields = ['id_estado', 'nombre_estado']


class EventoSerializer(serializers.ModelSerializer):
    categorias = serializers.PrimaryKeyRelatedField(
        queryset=models.Categoria.objects.all(),
        many=True,
        required=False,
        write_only=True
    )
    
    class Meta:
        model = models.Evento
        fields = [
            'id_evento', 'nombre_evento', 'descripcion_evento',
            'hora_inicio', 'hora_final', 'fecha_inicio', 'fecha_final', 
            'lugar', 'categorias'
        ]

    def create(self, validated_data):
        categorias = validated_data.pop('categorias', [])
        evento = models.Evento.objects.create(**validated_data)
        
        # Crear relaciones con categorías
        for categoria in categorias:
            models.EventoCategoria.objects.create(
                id_evento=evento,
                id_categoria=categoria
            )
        
        return evento

    def update(self, instance, validated_data):
        categorias = validated_data.pop('categorias', None)
        
        # Actualizar campos del evento
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Actualizar categorías si se proporcionan
        if categorias is not None:
            models.EventoCategoria.objects.filter(id_evento=instance).delete()
            for categoria in categorias:
                models.EventoCategoria.objects.create(
                    id_evento=instance,
                    id_categoria=categoria
                )
        
        return instance


class PerfilEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerfilEvento
        fields = ['id_perfil', 'id_evento', 'id_estado', 'id_rol']


class EventoCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventoCategoria
        fields = ['id_evento', 'id_categoria']


class EventoRangoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventoRangoEdad
        fields = ['id_evento', 'id_rango_edad']