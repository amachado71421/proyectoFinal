from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from . import models, serializers

Perfil = get_user_model()


# --------------------------------------------------
# MODEL TESTS
# --------------------------------------------------
class RolModelTest(TestCase):
    def setUp(self):
        self.rol = models.Rol.objects.create(nombre_rol="Administrador")

    def test_rol_creation(self):
        self.assertEqual(self.rol.nombre_rol, "Administrador")
        self.assertIsInstance(self.rol, models.Rol)

    def test_rol_str(self):
        self.assertEqual(str(self.rol), "Administrador")


class ResultadoModelTest(TestCase):
    def setUp(self):
        self.resultado = models.Resultado.objects.create(estado_resultado="Ganador")

    def test_resultado_creation(self):
        self.assertEqual(self.resultado.estado_resultado, "Ganador")

    def test_resultado_str(self):
        self.assertEqual(str(self.resultado), "Ganador")


class PerfilModelTest(TestCase):
    def setUp(self):
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")
        self.perfil = Perfil.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpass123",
            first_name="Test",
            last_name="User",
            peso_kg=70.5,
            altura=175,
            id_rol=self.rol
        )

    def test_perfil_creation(self):
        self.assertEqual(self.perfil.username, "testuser")
        self.assertEqual(self.perfil.email, "test@example.com")
        self.assertEqual(self.perfil.peso_kg, 70.5)
        self.assertEqual(self.perfil.altura, 175)

    def test_perfil_str(self):
        expected = "testuser <test@example.com> 70.5kg 175cm"
        self.assertEqual(str(self.perfil), expected)


class LogroModelTest(TestCase):
    def setUp(self):
        self.logro = models.Logro.objects.create(
            nombre_logro="Campeón Nacional",
            descripcion_logro="Primer lugar en torneo nacional"
        )

    def test_logro_creation(self):
        self.assertEqual(self.logro.nombre_logro, "Campeón Nacional")
        self.assertEqual(self.logro.descripcion_logro, "Primer lugar en torneo nacional")

    def test_logro_str(self):
        self.assertEqual(str(self.logro), "Campeón Nacional")


class PalmaresModelTest(TestCase):
    def setUp(self):
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")
        self.resultado = models.Resultado.objects.create(estado_resultado="Ganador")
        self.perfil = Perfil.objects.create_user(username="testuser", email="test@example.com")
        self.palmares = models.Palmares.objects.create(
            id_perfil=self.perfil,
            id_resultado=self.resultado
        )

    def test_palmares_creation(self):
        self.assertEqual(self.palmares.id_perfil, self.perfil)
        self.assertEqual(self.palmares.id_resultado, self.resultado)

    def test_palmares_str(self):
        expected = f"Palmarés: {self.perfil} - {self.resultado}"
        self.assertEqual(str(self.palmares), expected)


class PerfilLogroModelTest(TestCase):
    def setUp(self):
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")
        self.perfil = Perfil.objects.create_user(username="testuser", email="test@example.com")
        self.logro = models.Logro.objects.create(nombre_logro="Campeón")
        from datetime import date
        self.perfil_logro = models.PerfilLogro.objects.create(
            id_perfil=self.perfil,
            id_logro=self.logro,
            fecha_asignacion=date.today(),
            comentarios_logro="Excelente desempeño"
        )

    def test_perfil_logro_creation(self):
        self.assertEqual(self.perfil_logro.id_perfil, self.perfil)
        self.assertEqual(self.perfil_logro.id_logro, self.logro)
        self.assertEqual(self.perfil_logro.comentarios_logro, "Excelente desempeño")

    def test_perfil_logro_str(self):
        expected = f"{self.perfil} - {self.logro}"
        self.assertEqual(str(self.perfil_logro), expected)


class EventoModelTest(TestCase):
    def setUp(self):
        from datetime import date, time
        self.evento = models.Evento.objects.create(
            nombre_evento="Torneo Kyokushin",
            descripcion_evento="Torneo anual de karate",
            hora_inicio=time(9, 0),
            hora_final=time(17, 0),
            fecha_inicio=date.today(),
            fecha_final=date.today(),
            lugar="Gimnasio Central"
        )

    def test_evento_creation(self):
        self.assertEqual(self.evento.nombre_evento, "Torneo Kyokushin")
        self.assertEqual(self.evento.lugar, "Gimnasio Central")

    def test_evento_str(self):
        self.assertEqual(str(self.evento), "Torneo Kyokushin")


# --------------------------------------------------
# SERIALIZER TESTS
# --------------------------------------------------
class RegisterSerializerTest(TestCase):
    def setUp(self):
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")

    def test_valid_registration(self):
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'password123',
            'password_confirm': 'password123',
            'first_name': 'New',
            'last_name': 'User',
            'id_rol': self.rol.id_rol
        }
        serializer = serializers.RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.username, 'newuser')
        self.assertEqual(user.email, 'new@example.com')

    def test_password_mismatch(self):
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'password123',
            'password_confirm': 'different123'
        }
        serializer = serializers.RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_duplicate_email(self):
        Perfil.objects.create_user(username='existing', email='test@example.com')
        data = {
            'username': 'newuser',
            'email': 'test@example.com',
            'password': 'password123',
            'password_confirm': 'password123'
        }
        serializer = serializers.RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)


class LoginSerializerTest(TestCase):
    def setUp(self):
        self.user = Perfil.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

    def test_valid_login(self):
        data = {'email': 'test@example.com', 'password': 'testpass123'}
        serializer = serializers.LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['user'], self.user)

    def test_invalid_password(self):
        data = {'email': 'test@example.com', 'password': 'wrongpass'}
        serializer = serializers.LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_inactive_user(self):
        self.user.is_active = False
        self.user.save()
        data = {'email': 'test@example.com', 'password': 'testpass123'}
        serializer = serializers.LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())


class EventoSerializerTest(TestCase):
    def setUp(self):
        self.categoria1 = models.Categoria.objects.create(nombre_categoria="Kumite")
        self.categoria2 = models.Categoria.objects.create(nombre_categoria="Kata")

    def test_evento_creation_with_categories(self):
        from datetime import date, time
        data = {
            'nombre_evento': 'Torneo Test',
            'descripcion_evento': 'Descripción test',
            'hora_inicio': '09:00:00',
            'hora_final': '17:00:00',
            'fecha_inicio': str(date.today()),
            'fecha_final': str(date.today()),
            'lugar': 'Gimnasio Test',
            'categorias': [self.categoria1.id_categoria, self.categoria2.id_categoria]
        }
        serializer = serializers.EventoSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        evento = serializer.save()
        self.assertEqual(evento.nombre_evento, 'Torneo Test')
        self.assertEqual(evento.eventocategoria_set.count(), 2)


# --------------------------------------------------
# VIEW TESTS
# --------------------------------------------------
class RolViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.rol = models.Rol.objects.create(nombre_rol="Test Rol")

    def test_list_roles(self):
        response = self.client.get(reverse('rol-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_rol(self):
        # Create authenticated user
        rol = models.Rol.objects.create(nombre_rol="Usuario")
        user = Perfil.objects.create_user(
            username='admin',
            email='admin@test.com',
            password='admin123'
        )
        self.client.force_authenticate(user=user)
        data = {'nombre_rol': 'Nuevo Rol'}
        response = self.client.post(reverse('rol-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Rol.objects.count(), 3)  # Including the one created in setUp and the new one


class PerfilViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")
        self.user = Perfil.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            id_rol=self.rol
        )
        self.client.force_authenticate(user=self.user)

    def test_update_own_profile(self):
        data = {'first_name': 'Updated'}
        response = self.client.patch(reverse('perfil-detail', args=[self.user.id_perfil]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'Updated')

    def test_update_other_profile_forbidden(self):
        other_user = Perfil.objects.create_user(
            username='otheruser',
            email='other@example.com',
            password='testpass123'
        )
        data = {'first_name': 'Hacked'}
        response = self.client.patch(reverse('perfil-detail', args=[other_user.id_perfil]), data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class LogroViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.logro = models.Logro.objects.create(
            nombre_logro="Test Logro",
            descripcion_logro="Descripción test"
        )
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")
        self.user = Perfil.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        from datetime import date
        models.PerfilLogro.objects.create(
            id_perfil=self.user,
            id_logro=self.logro,
            fecha_asignacion=date.today()
        )

    def test_con_usuarios_action(self):
        response = self.client.get(reverse('logro-con-usuarios'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertIn('usuarios', response.data[0])
        self.assertEqual(len(response.data[0]['usuarios']), 1)


class PerfilEventoViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")
        self.estado = models.Estado.objects.create(nombre_estado="Inscrito")
        self.evento = models.Evento.objects.create(
            nombre_evento="Test Evento",
            lugar="Test Place"
        )
        self.user = Perfil.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_inscripcion(self):
        data = {
            'id_perfil': self.user.id_perfil,
            'id_evento': self.evento.id_evento,
            'id_estado': self.estado.id_estado
        }
        response = self.client.post(reverse('perfil_evento-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.PerfilEvento.objects.count(), 1)

    def test_duplicate_inscripcion(self):
        models.PerfilEvento.objects.create(
            id_perfil=self.user,
            id_evento=self.evento,
            id_estado=self.estado
        )
        data = {
            'id_perfil': self.user.id_perfil,
            'id_evento': self.evento.id_evento,
            'id_estado': self.estado.id_estado
        }
        response = self.client.post(reverse('perfil_evento-list'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cancelar_inscripcion(self):
        models.PerfilEvento.objects.create(
            id_perfil=self.user,
            id_evento=self.evento,
            id_estado=self.estado
        )
        data = {
            'id_perfil': self.user.id_perfil,
            'id_evento': self.evento.id_evento
        }
        response = self.client.delete(reverse('perfil_evento-cancelar'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(models.PerfilEvento.objects.count(), 0)


# --------------------------------------------------
# AUTHENTICATION TESTS
# --------------------------------------------------
class RegisterAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.rol = models.Rol.objects.create(nombre_rol="Usuario")

    def test_successful_registration(self):
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'password123',
            'password_confirm': 'password123',
            'first_name': 'New',
            'last_name': 'User',
            'id_rol': self.rol.id_rol
        }
        response = self.client.post(reverse('register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)
        self.assertEqual(Perfil.objects.count(), 1)


class LoginAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Perfil.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

    def test_successful_login(self):
        data = {'email': 'test@example.com', 'password': 'testpass123'}
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)

    def test_invalid_credentials(self):
        data = {'email': 'test@example.com', 'password': 'wrongpass'}
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class MeAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Perfil.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)

    def test_get_me_authenticated(self):
        response = self.client.get(reverse('me'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')

    def test_get_me_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse('me'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class LogoutAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_logout(self):
        response = self.client.post(reverse('logout'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check that cookies are set to be deleted (empty value)
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)
        self.assertEqual(response.cookies['access_token'].value, '')
        self.assertEqual(response.cookies['refresh_token'].value, '')


class PromoteUserAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = Perfil.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123'
        )
        self.user = Perfil.objects.create_user(
            username='testuser',
            email='user@example.com',
            password='user123'
        )
        self.client.force_authenticate(user=self.admin)

    def test_promote_user_to_staff(self):
        data = {'id_perfil': self.user.id_perfil, 'is_staff': True}
        response = self.client.post(reverse('promote_user'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_staff)

    def test_promote_user_not_admin(self):
        self.client.force_authenticate(user=self.user)
        data = {'id_perfil': self.user.id_perfil, 'is_staff': True}
        response = self.client.post(reverse('promote_user'), data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
