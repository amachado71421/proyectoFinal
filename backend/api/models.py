from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class Resultado(models.Model):
	id_resultado = models.AutoField(primary_key=True)
	estado_resultado = models.CharField(max_length=25)

	class Meta:
		db_table = 'resultado'
		managed = False

	def __str__(self):
		return self.estado_resultado


class Rol(models.Model):
	id_rol = models.AutoField(primary_key=True)
	nombre_rol = models.CharField(max_length=30)

	class Meta:
		db_table = 'rol'
		managed = False

	def __str__(self):
		return self.nombre_rol


class Perfil(AbstractUser):
    id_perfil = models.AutoField(primary_key=True)
    
    # Campos adicionales
    url_imagen = models.CharField(max_length=255, null=True, blank=True)
    peso_kg = models.FloatField(null=True, blank=True)
    altura = models.IntegerField(null=True, blank=True)
    id_rol = models.ForeignKey(
        'Rol',
        db_column='id_rol',
        null=True,
        blank=True,
        on_delete=models.RESTRICT
    )

    groups = models.ManyToManyField(
        Group,
        related_name='perfil_groups',
        blank=True,
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='perfil_user_permissions',
        blank=True,
        verbose_name='user permissions'
    )

    class Meta:
        db_table = 'perfil'
        managed = True

    def __str__(self):
        campos = [self.username]
        if self.email:
            campos.append(f"<{self.email}>")
        if self.peso_kg:
            campos.append(f"{self.peso_kg}kg")
        if self.altura:
            campos.append(f"{self.altura}cm")
        return " ".join(campos)




class Palmares(models.Model):
	id_palmares = models.AutoField(primary_key=True)
	id_perfil = models.ForeignKey(Perfil, db_column='id_perfil', on_delete=models.CASCADE)
	id_resultado = models.ForeignKey(Resultado, db_column='id_resultado', on_delete=models.CASCADE)

	class Meta:
		db_table = 'palmares'
		managed = False

	def __str__(self):
		return f"Palmarés: {self.id_perfil} - {self.id_resultado}"


class Logro(models.Model):
	id_logro = models.AutoField(primary_key=True)
	nombre_logro = models.CharField(max_length=50)
	descripcion_logro = models.TextField(null=True, blank=True)
	fecha_creacion = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = 'logro'
		managed = False

	def __str__(self):
		return self.nombre_logro


class PerfilLogro(models.Model):
	id_perfil = models.ForeignKey(Perfil, db_column='id_perfil', on_delete=models.CASCADE)
	id_logro = models.ForeignKey(Logro, db_column='id_logro', on_delete=models.CASCADE)
	fecha_asignacion = models.DateField()
	comentarios_logro = models.TextField(null=True, blank=True)

	class Meta:
		db_table = 'perfil_logro'
		unique_together = (('id_perfil', 'id_logro'),)
		managed = False

	def __str__(self):
		return f"{self.id_perfil} - {self.id_logro}"


class Categoria(models.Model):
	id_categoria = models.AutoField(primary_key=True)
	nombre_categoria = models.CharField(max_length=30)

	class Meta:
		db_table = 'categoria'
		managed = False

	def __str__(self):
		return self.nombre_categoria


class RangoEdad(models.Model):
	id_rango_edad = models.AutoField(primary_key=True)
	nombre_rango_edad = models.CharField(max_length=40)
	edad_minima = models.IntegerField(null=True, blank=True)
	edad_maxima = models.IntegerField(null=True, blank=True)

	class Meta:
		db_table = 'rango_edad'
		managed = False

	def __str__(self):
		return self.nombre_rango_edad


class Evento(models.Model):
	id_evento = models.AutoField(primary_key=True)
	nombre_evento = models.CharField(max_length=100)
	descripcion_evento = models.TextField(null=True, blank=True)
	hora_inicio = models.TimeField(null=True, blank=True)
	hora_final = models.TimeField(null=True, blank=True)
	fecha_inicio = models.DateField(null=True, blank=True)
	fecha_final = models.DateField(null=True, blank=True)
	lugar = models.CharField(max_length=100, null=True, blank=True)

	class Meta:
		db_table = 'evento'
		managed = False

	def __str__(self):
		return self.nombre_evento


class Estado(models.Model):
	id_estado = models.AutoField(primary_key=True)
	nombre_estado = models.CharField(max_length=20)

	class Meta:
		db_table = 'estado'
		managed = False

	def __str__(self):
		return self.nombre_estado


class PerfilEvento(models.Model):
	id_perfil = models.ForeignKey(Perfil, db_column='id_perfil', on_delete=models.CASCADE)
	id_evento = models.ForeignKey(Evento, db_column='id_evento', on_delete=models.CASCADE)
	id_estado = models.ForeignKey(Estado, db_column='id_estado', on_delete=models.RESTRICT)
	id_rol = models.ForeignKey(Rol, db_column='id_rol', on_delete=models.RESTRICT)

	class Meta:
		db_table = 'perfil_evento'
		unique_together = (('id_perfil', 'id_evento'),)
		managed = False

	def __str__(self):
		return f"{self.id_perfil} -> {self.id_evento} ({self.id_estado})"


class EventoCategoria(models.Model):
	id_evento = models.ForeignKey(Evento, db_column='id_evento', on_delete=models.CASCADE)
	id_categoria = models.ForeignKey(Categoria, db_column='id_categoria', on_delete=models.CASCADE)

	class Meta:
		db_table = 'evento_categoria'
		unique_together = (('id_evento', 'id_categoria'),)
		managed = False

	def __str__(self):
		return f"{self.id_evento} - {self.id_categoria}"


class EventoRangoEdad(models.Model):
	id_evento = models.ForeignKey(Evento, db_column='id_evento', on_delete=models.CASCADE)
	id_rango_edad = models.ForeignKey(RangoEdad, db_column='id_rango_edad', on_delete=models.CASCADE)

	class Meta:
		db_table = 'evento_rango_edad'
		unique_together = (('id_evento', 'id_rango_edad'),)
		managed = False

	def __str__(self):
		return f"{self.id_evento} - {self.id_rango_edad}"

