from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from api.views_auth import (
    CookieTokenObtainPairView,
    get_csrf_token,
    LogoutAPIView
)
from api.views_auth import get_csrf_token
from . import views

# Rutas de modelos
router = DefaultRouter()
router.register(r'resultados', views.ResultadoViewSet, basename='resultado')
router.register(r'roles', views.RolViewSet, basename='rol')
router.register(r'perfiles', views.PerfilViewSet, basename='perfil')
router.register(r'palmares', views.PalmaresViewSet, basename='palmares')
router.register(r'logros', views.LogroViewSet, basename='logro')
router.register(r'perfil-logros', views.PerfilLogroViewSet, basename='perfil_logro')
router.register(r'categorias', views.CategoriaViewSet, basename='categoria')
router.register(r'rango-edad', views.RangoEdadViewSet, basename='rango_edad')
router.register(r'eventos', views.EventoViewSet, basename='evento')
router.register(r'estados', views.EstadoViewSet, basename='estado')
router.register(r'perfil-evento', views.PerfilEventoViewSet, basename='perfil_evento')
router.register(r'evento-categoria', views.EventoCategoriaViewSet, basename='evento_categoria')
router.register(r'evento-rango', views.EventoRangoEdadViewSet, basename='evento_rango')

# Rutas de autenticación y seguridad
urlpatterns = [
    path('', include(router.urls)),

    # Registro y login tradicional (devuelve tokens en el body)
    path('auth/login/', views.LoginAPIView.as_view(), name='login'),
    path('auth/register/', views.RegisterAPIView.as_view(), name='register'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', views.MeAPIView.as_view(), name='me'),

    # Login con cookies HttpOnly
    path('token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # CSRF token para frontend
    path('csrf/', get_csrf_token, name='get_csrf_token'),

    # Logout que elimina cookies
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]
