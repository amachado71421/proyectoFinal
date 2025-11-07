from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

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
]
