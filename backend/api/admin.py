from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Perfil, Rol, Resultado, Palmares, Logro, PerfilLogro, Categoria, RangoEdad, Evento, Estado, PerfilEvento, EventoCategoria, EventoRangoEdad

@admin.register(Perfil)
class PerfilAdmin(UserAdmin):
    model = Perfil
    list_display = ('username', 'email', 'is_active', 'id_rol')
    fieldsets = UserAdmin.fieldsets + (
        ('Datos adicionales', {'fields': ('url_imagen', 'peso_kg', 'altura', 'id_rol')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Datos adicionales', {'fields': ('url_imagen', 'peso_kg', 'altura', 'id_rol')}),
    )

# Registrar otros modelos necesarios
admin.site.register(Rol)
admin.site.register(Resultado)
admin.site.register(Palmares)
admin.site.register(Logro)
admin.site.register(PerfilLogro)
admin.site.register(Categoria)
admin.site.register(RangoEdad)
admin.site.register(Evento)
admin.site.register(Estado)
admin.site.register(PerfilEvento)
admin.site.register(EventoCategoria)
admin.site.register(EventoRangoEdad)