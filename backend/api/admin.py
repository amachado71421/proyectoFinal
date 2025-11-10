from django.contrib import admin
from . import models


@admin.register(models.Resultado)
class ResultadoAdmin(admin.ModelAdmin):
	list_display = ('id_resultado', 'estado_resultado')


@admin.register(models.Rol)
class RolAdmin(admin.ModelAdmin):
	list_display = ('id_rol', 'nombre_rol')


@admin.register(models.Perfil)
class PerfilAdmin(admin.ModelAdmin):
	list_display = ('id_perfil', 'nombre', 'email', 'estado')


@admin.register(models.Palmares)
class PalmaresAdmin(admin.ModelAdmin):
	list_display = ('id_palmares', 'id_perfil', 'id_resultado')


@admin.register(models.Logro)
class LogroAdmin(admin.ModelAdmin):
	list_display = ('id_logro', 'nombre_logro', 'fecha_creacion')


@admin.register(models.Categoria)
class CategoriaAdmin(admin.ModelAdmin):
	list_display = ('id_categoria', 'nombre_categoria')


@admin.register(models.RangoEdad)
class RangoEdadAdmin(admin.ModelAdmin):
	list_display = ('id_rango_edad', 'nombre_rango_edad')


@admin.register(models.Evento)
class EventoAdmin(admin.ModelAdmin):
	list_display = ('id_evento', 'nombre_evento', 'fecha_inicio', 'fecha_final')


@admin.register(models.Estado)
class EstadoAdmin(admin.ModelAdmin):
	list_display = ('id_estado', 'nombre_estado')

