from pathlib import Path
from datetime import timedelta
import os

# --------------------------------------------------
# Rutas base del proyecto
# --------------------------------------------------
# BASE_DIR apunta al directorio raíz del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# --------------------------------------------------
# Seguridad
# --------------------------------------------------
# Clave secreta para el proyecto (mantener en privado en producción)
SECRET_KEY = 'django-insecure-buob)7!r1huf$39v+2eq-c(k63z61v+k@*(^+_f=7ea-v7)7fo'

# Activar/desactivar modo debug
DEBUG = True

# Hosts permitidos para la aplicación
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# --------------------------------------------------
# Aplicaciones instaladas
# --------------------------------------------------
# Incluye apps de Django, apps propias y librerías externas
INSTALLED_APPS = [
    "corsheaders",  # Soporte para CORS
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api",  # App principal del proyecto
    "rest_framework",  # DRF para APIs
    "rest_framework_simplejwt",  # JWT para autenticación
]

# --------------------------------------------------
# Modelo de usuario personalizado
# --------------------------------------------------
AUTH_USER_MODEL = "api.Perfil"

# --------------------------------------------------
# Middleware
# --------------------------------------------------
# Define la cadena de middleware de Django
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Soporte para CORS
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# --------------------------------------------------
# Configuración CORS
# --------------------------------------------------
# Orígenes permitidos para peticiones cross-origin
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True  # Permitir envío de cookies

# --------------------------------------------------
# CSRF
# --------------------------------------------------
# Orígenes confiables para CSRF
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CSRF_COOKIE_HTTPONLY = False  # Permitir lectura desde frontend si es necesario
CSRF_COOKIE_SAMESITE = "Lax"  # Política SameSite
CSRF_COOKIE_SECURE = not DEBUG  # Cookies seguras solo en producción

# --------------------------------------------------
# Templates
# --------------------------------------------------
ROOT_URLCONF = "backendKoiDo.urls"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Directorios adicionales de templates
        "APP_DIRS": True,  # Buscar templates dentro de apps
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
WSGI_APPLICATION = "backendKoiDo.wsgi.application"

# --------------------------------------------------
# Base de datos
# --------------------------------------------------
# Configuración para MySQL
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "koido_dojo",
        "USER": "root",
        "PASSWORD": "12345678",
        "HOST": "localhost",  # usar 127.0.0.1 en Windows si da problemas
        "PORT": "3306",
        "OPTIONS": {"charset": "utf8mb4"},  # Soporte para emojis y caracteres especiales
    }
}

# --------------------------------------------------
# Validación de contraseñas
# --------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --------------------------------------------------
# Internacionalización
# --------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --------------------------------------------------
# Archivos estáticos
# --------------------------------------------------
STATIC_URL = "static/"

# --------------------------------------------------
# Clave primaria por defecto
# --------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --------------------------------------------------
# REST Framework
# --------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "api.authentication.CookieJWTAuthentication",  # Autenticación via JWT en cookies
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
}

# --------------------------------------------------
# Configuración JWT con cookies HttpOnly
# --------------------------------------------------
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id_perfil",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "AUTH_COOKIE": "access_token",
    "AUTH_COOKIE_SECURE": not DEBUG,
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_SAMESITE": "Lax",
}
