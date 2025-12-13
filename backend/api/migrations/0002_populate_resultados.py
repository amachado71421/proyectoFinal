# Generated manually to populate Resultado table

from django.db import migrations


def populate_resultados(apps, schema_editor):
    Resultado = apps.get_model('api', 'Resultado')
    Resultado.objects.get_or_create(id_resultado=1, defaults={'estado_resultado': 'VICTORIA'})
    Resultado.objects.get_or_create(id_resultado=2, defaults={'estado_resultado': 'EMPATE'})
    Resultado.objects.get_or_create(id_resultado=3, defaults={'estado_resultado': 'DERROTA'})


def reverse_populate_resultados(apps, schema_editor):
    Resultado = apps.get_model('api', 'Resultado')
    Resultado.objects.filter(id_resultado__in=[1, 2, 3]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_resultados, reverse_populate_resultados),
    ]
