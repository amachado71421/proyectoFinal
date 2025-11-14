from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
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
    nombre_rol = serializers.CharField(
        source='id_rol.nombre_rol', read_only=True)
    id_rol = serializers.PrimaryKeyRelatedField(
        queryset=models.Rol.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = models.Perfil
        fields = ['id_perfil', 'username', 'email', 'first_name', 'last_name',
                  'url_imagen', 'peso_kg', 'altura', 'id_rol', 'nombre_rol', 'is_active']
        read_only_fields = ['id_perfil', 'nombre_rol', 'is_active']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)
    id_rol = serializers.PrimaryKeyRelatedField(
        queryset=models.Rol.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = models.Perfil
        fields = ['username', 'email', 'password', 'password_confirm',
                  'first_name', 'last_name', 'url_imagen', 'peso_kg', 'altura', 'id_rol']

    def validate_email(self, value):
        if models.Perfil.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def validate(self, data):
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        password = validated_data.pop('password')
        username = validated_data.get(
            'username') or validated_data.get('email')
        user = models.Perfil.objects.create_user(
            username=username, email=validated_data.get('email'), password=password)
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
        try:
            user = models.Perfil.objects.get(email=email)
        except models.Perfil.DoesNotExist:
            raise serializers.ValidationError(
                {"detail": "Credenciales inválidas."})
        if not user.check_password(password):
            raise serializers.ValidationError(
                {"detail": "Credenciales inválidas."})
        if not user.is_active:
            raise serializers.ValidationError(
                {"detail": "Usuario desactivado."})
        refresh = RefreshToken.for_user(user)
        data['user'] = user
        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)
        return data


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
