from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from . import views_auth

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

urlpatterns = [
    path('', include(router.urls)),

    # Auth endpoints (moved to views_auth)
    path('auth/login/', views_auth.LoginAPIView.as_view(), name='login'),
    path('auth/register/', views_auth.RegisterAPIView.as_view(), name='register'),

    path('auth/refresh/', views_auth.CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', views_auth.MeAPIView.as_view(), name='me'),
    path('token/', views_auth.CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('csrf/', views_auth.get_csrf_token, name='get_csrf_token'),
    path('logout/', views_auth.LogoutAPIView.as_view(), name='logout'),

    # Promote / demote users (requires admin token)
    path('auth/promote-user/', views_auth.PromoteUserAPIView.as_view(), name='promote_user'),
]