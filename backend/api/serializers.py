from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models

# Obtener el modelo de usuario personalizado
Perfil = get_user_model()


# --------------------------------------------------
# RESULTADO
# --------------------------------------------------
class ResultadoSerializer(serializers.ModelSerializer):
    # Serializador simple para el modelo Resultado
    class Meta:
        model = models.Resultado
        fields = ['id_resultado', 'estado_resultado']


# --------------------------------------------------
# ROL
# --------------------------------------------------
class RolSerializer(serializers.ModelSerializer):
    # Serializador simple para el modelo Rol
    class Meta:
        model = models.Rol
        fields = ['id_rol', 'nombre_rol']


# --------------------------------------------------
# PERFIL
# --------------------------------------------------
class PerfilSerializer(serializers.ModelSerializer):
    id_perfil = serializers.IntegerField(read_only=True)

    class Meta:
        model = Perfil
        fields = [
            'id_perfil', 'username', 'email', 'first_name', 'last_name',
            'url_imagen', 'peso_kg', 'altura', 'id_rol',
            'is_active', 'is_staff', 'is_superuser'
        ]
        # Campos que no se pueden modificar desde este serializer
        read_only_fields = ['is_active', 'is_staff', 'is_superuser']


# --------------------------------------------------
# REGISTER (CREAR NUEVO USUARIO)
# --------------------------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Perfil
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name', 'url_imagen',
            'peso_kg', 'altura', 'id_rol'
        ]

    def validate_email(self, value):
        # Validar que el email sea único
        if Perfil.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def validate(self, data):
        # Validar que las contraseñas coincidan
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        # Eliminar password_confirm ya que no se necesita para crear el usuario
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')

        # Usar username si existe, si no usar email
        username = validated_data.get('username') or validated_data['email']

        # Crear el usuario
        user = Perfil.objects.create_user(
            username=username,
            email=validated_data.get('email'),
            password=password
        )

        # Asignar campos opcionales si existen
        for attr in ['first_name', 'last_name', 'url_imagen', 'peso_kg', 'altura', 'id_rol']:
            if attr in validated_data:
                setattr(user, attr, validated_data[attr])

        user.save()
        return user


# --------------------------------------------------
# LOGIN
# --------------------------------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Autenticación básica usando email y contraseña
        email = data['email']
        password = data['password']

        user = Perfil.objects.filter(email__iexact=email).first()

        if not user or not user.check_password(password):
            raise serializers.ValidationError("Email o contraseña inválidos.")

        if not user.is_active:
            raise serializers.ValidationError("Cuenta inactiva.")

        data['user'] = user
        return data


# --------------------------------------------------
# PALMARES
# --------------------------------------------------
class PalmaresSerializer(serializers.ModelSerializer):
    # Usar PrimaryKeyRelatedField para las relaciones
    id_perfil = serializers.PrimaryKeyRelatedField(queryset=models.Perfil.objects.all())
    id_resultado = serializers.PrimaryKeyRelatedField(queryset=models.Resultado.objects.all())

    class Meta:
        model = models.Palmares
        fields = ['id_palmares', 'id_perfil', 'id_resultado']


# --------------------------------------------------
# LOGRO
# --------------------------------------------------
class LogroUsuarioSerializer(serializers.ModelSerializer):
    # Campo calculado para mostrar el nombre completo
    nombre = serializers.SerializerMethodField()

    class Meta:
        model = models.Perfil
        fields = ['id', 'username', 'nombre', 'email']

    def get_nombre(self, obj):
        # Devuelve nombre completo si existe, sino username
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username


class LogroSerializer(serializers.ModelSerializer):
    # Mostrar los usuarios asociados al logro
    usuarios = serializers.SerializerMethodField()

    class Meta:
        model = models.Logro
        fields = ['id_logro', 'nombre_logro', 'descripcion_logro', 'fecha_creacion', 'usuarios']

    def get_usuarios(self, obj):
        # Obtener todos los perfiles relacionados con este logro
        perfil_logros = models.PerfilLogro.objects.filter(id_logro=obj.id_logro).select_related('id_perfil')
        usuarios_data = []
        for pl in perfil_logros:
            perfil = pl.id_perfil
            usuarios_data.append({
                'id': perfil.id_perfil,
                'username': perfil.username,
                'nombre': f"{perfil.first_name} {perfil.last_name}".strip() or perfil.username,
                'email': perfil.email
            })
        return usuarios_data


# --------------------------------------------------
# PERFIL LOGRO
# --------------------------------------------------
class PerfilLogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerfilLogro
        fields = ['id_perfil', 'id_logro', 'fecha_asignacion', 'comentarios_logro']


# --------------------------------------------------
# CATEGORIA
# --------------------------------------------------
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Categoria
        fields = ['id_categoria', 'nombre_categoria']


# --------------------------------------------------
# RANGO EDAD
# --------------------------------------------------
class RangoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RangoEdad
        fields = ['id_rango_edad', 'nombre_rango_edad', 'edad_minima', 'edad_maxima']


# --------------------------------------------------
# ESTADO
# --------------------------------------------------
class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Estado
        fields = ['id_estado', 'nombre_estado']


# --------------------------------------------------
# EVENTO
# --------------------------------------------------
class EventoSerializer(serializers.ModelSerializer):
    # Permite asignar categorías al crear o actualizar evento
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
        # Crear evento y asignar categorías
        categorias = validated_data.pop('categorias', [])
        evento = models.Evento.objects.create(**validated_data)

        for categoria in categorias:
            models.EventoCategoria.objects.create(
                id_evento=evento,
                id_categoria=categoria
            )

        return evento

    def update(self, instance, validated_data):
        # Actualizar campos del evento
        categorias = validated_data.pop('categorias', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Actualizar categorías si se proporcionan
        if categorias is not None:
            models.EventoCategoria.objects.filter(id_evento=instance).delete()
            for categoria in categorias:
                models.EventoCategoria.objects.create(
                    id_evento=instance, id_categoria=categoria
                )

        return instance


# --------------------------------------------------
# PERFIL EVENTO (INSCRIPCIÓN)
# --------------------------------------------------
class PerfilEventoSerializer(serializers.ModelSerializer):
    id_perfil = serializers.PrimaryKeyRelatedField(queryset=Perfil.objects.all())
    id_evento = serializers.PrimaryKeyRelatedField(queryset=models.Evento.objects.all())
    id_estado = serializers.PrimaryKeyRelatedField(queryset=models.Estado.objects.all())
    id_rol = serializers.PrimaryKeyRelatedField(
        queryset=models.Rol.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = models.PerfilEvento
        fields = ['id_perfil', 'id_evento', 'id_estado', 'id_rol']


# --------------------------------------------------
# EVENTO CATEGORIA
# --------------------------------------------------
class EventoCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventoCategoria
        fields = ['id_evento', 'id_categoria']


# --------------------------------------------------
# EVENTO RANGO EDAD
# --------------------------------------------------
class EventoRangoEdadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventoRangoEdad
        fields = ['id_evento', 'id_rango_edad']
