# 🥋 Manual de Usuario - Plataforma Web Dojo Koi-Do

Bienvenido al sistema de gestión del Dojo Koi-Do. Esta plataforma te permite gestionar reservas, eventos, perfiles de usuarios y mucho más de manera sencilla y eficiente.

---

## 📋 ¿Qué puedes hacer con esta plataforma?

### Para Todos los Usuarios
- **Ver el calendario** de clases y eventos
- **Reservar clases** y eventos disponibles
- **Gestionar tu perfil** personal
- **Ver los grados de karate** y usuarios por cinturón
- **Contactar** con el dojo

### Para Instructores
- **Administrar eventos** y clases
- **Gestionar inscripciones** de alumnos
- **Asignar logros** y cinturones
- **Ver estadísticas** de asistencia

### Para Administradores
- **Gestionar usuarios** y roles
- **Configurar el sistema** completo
- **Acceder al panel administrativo** de Django

---

## 🚀 Primeros Pasos

### Requisitos del Sistema
Antes de comenzar, asegúrate de tener instalado:
- **Python 3.8** o superior
- **Node.js 16** o superior
- **MySQL 8** o superior
- **Git** para clonar el repositorio

### 1. Obtener el Proyecto
```bash
git clone [URL_DEL_REPOSITORIO]
cd proyectoFinal
```

### 2. Configurar la Base de Datos
1. Abre MySQL Workbench o tu cliente MySQL preferido
2. Crea una nueva base de datos:
```sql
CREATE DATABASE koido_dojo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
3. Crea un usuario para la aplicación (opcional pero recomendado):
```sql
CREATE USER 'koido_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON koido_dojo.* TO 'koido_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configurar el Backend
```bash
cd backend

# Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # En Windows
# source venv/bin/activate  # En Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario (administrador)
python manage.py createsuperuser
```

### 4. Configurar Datos Iniciales
Ejecuta estos comandos SQL en tu base de datos para crear los roles básicos:

```sql
-- Insertar roles
INSERT INTO rol (nombre_rol) VALUES
('Administrador'),
('Instructor'),
('Alumno');

-- Insertar grados de karate
INSERT INTO logro (nombre_logro, descripcion_logro, fecha_creacion) VALUES
('mo kyu', 'Grado principiante', NOW()),
('10 kyu', 'Décimo kyu - cinturón naranja', NOW()),
('9 kyu', 'Noveno kyu - cinturón rojo claro', NOW()),
('8 kyu', 'Octavo kyu - cinturón celeste', NOW()),
('7 kyu', 'Séptimo kyu - cinturón azul', NOW()),
('6 kyu', 'Sexto kyu - cinturón amarillo', NOW()),
('5 kyu', 'Quinto kyu - cinturón morado', NOW()),
('4 kyu', 'Cuarto kyu - cinturón verde claro', NOW()),
('3 kyu', 'Tercer kyu - cinturón verde oscuro', NOW()),
('2 kyu', 'Segundo kyu - cinturón café claro', NOW()),
('1 kyu', 'Primer kyu - cinturón café oscuro', NOW()),
('Primer Dan', 'Primer grado negro', NOW()),
('Segundo Dan', 'Segundo grado negro', NOW()),
('Tercer Dan', 'Tercer grado negro', NOW()),
('Cuarto Dan', 'Cuarto grado negro', NOW()),
('Quinto Dan', 'Quinto grado negro', NOW()),
('Sexto Dan', 'Sexto grado negro', NOW()),
('Séptimo Dan', 'Séptimo grado negro', NOW()),
('Octavo Dan', 'Octavo grado negro', NOW()),
('Noveno Dan', 'Noveno grado negro', NOW()),
('Décimo Dan', 'Décimo grado negro', NOW());
```

### 5. Crear Usuario Administrador
Para crear un usuario administrador desde la base de datos:

```sql
-- Primero obtener el ID del rol Administrador
SELECT id_rol FROM rol WHERE nombre_rol = 'Administrador';

-- Crear el usuario administrador (reemplaza 'ID_DEL_ROL' con el ID obtenido)
INSERT INTO perfil (
    username, email, first_name, last_name, password,
    is_superuser, is_staff, is_active, date_joined, id_rol
) VALUES (
    'admin',
    'admin@dojokoido.com',
    'Administrador',
    'Sistema',
    'pbkdf2_sha256$600000$hashed_password_here', -- Genera un hash seguro
    1, 1, 1, NOW(),
    ID_DEL_ROL
);
```

### 6. Configurar el Frontend
```bash
cd ../KOI_DO_DOJO

# Instalar dependencias
npm install

# Configurar variables de entorno (crea un archivo .env)
echo "VITE_API_URL=http://localhost:8000" > .env
```

### 7. Ejecutar la Aplicación
Abre dos terminales separadas:

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # En Windows
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd KOI_DO_DOJO
npm run dev
```

### 8. Acceder a la Plataforma
- **Aplicación principal:** http://localhost:5173
- **API Backend:** http://localhost:8000
- **Panel Administrativo Django:** http://localhost:8000/admin

---

## 📱 Cómo Usar la Plataforma

### Registro e Inicio de Sesión
1. Ve a la página principal
2. Haz clic en "Iniciar Sesión" o "Registrarse"
3. Completa tus datos personales
4. Espera la aprobación de tu cuenta por un administrador

### Navegación Principal
- **Inicio:** Información general del dojo
- **Nosotros:** Conoce nuestra historia y filosofía
- **Calendario:** Ve clases y eventos disponibles
- **Perfil:** Gestiona tu información personal
- **Contacto:** Envíanos un mensaje

### Reservar una Clase
1. Ve al calendario
2. Selecciona la fecha y hora deseada
3. Haz clic en el evento
4. Confirma tu reserva
5. Recibirás una confirmación por email

### Ver Grados de Karate
1. Ve a la sección "Nosotros"
2. Busca "Grados de Karate"
3. Selecciona un cinturón para ver los usuarios con ese grado

---

## 👥 Roles y Permisos

### Alumno
- Ver calendario y eventos
- Reservar clases
- Gestionar perfil personal
- Ver grados disponibles

### Instructor
- Todo lo que puede hacer un alumno
- Crear y editar eventos
- Gestionar inscripciones
- Asignar logros a alumnos
- Ver estadísticas

### Administrador
- Todo lo que pueden hacer instructores
- Gestionar usuarios y roles
- Acceder al panel administrativo
- Configurar el sistema completo

---

## 🔧 Solución de Problemas

### Problemas Comunes

**No puedo iniciar sesión**
- Verifica que tu cuenta esté aprobada por un administrador
- Revisa que tu email y contraseña sean correctos

**No veo eventos en el calendario**
- Actualiza la página
- Verifica tu conexión a internet
- Contacta a un administrador si el problema persiste

**Error al reservar**
- Verifica que haya cupo disponible
- Asegúrate de no tener otra reserva en el mismo horario
- Contacta a un instructor si necesitas ayuda

**La página no carga**
- Borra la caché del navegador
- Verifica que el backend esté ejecutándose
- Revisa la consola del navegador para errores

### Contacto de Soporte
Si tienes problemas que no puedes resolver:
- Email: soporte@dojokoido.com
- Teléfono: [Número de contacto]
- Horario: Lunes a Viernes, 9:00 - 18:00

---

## 📋 Comandos Útiles

### Backend
```bash
# Ejecutar servidor de desarrollo
python manage.py runserver

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Recopilar archivos estáticos
python manage.py collectstatic
```

### Frontend
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar pruebas
npm test
```

---

## 🔒 Seguridad y Privacidad

- Tus datos personales están protegidos con encriptación
- Las contraseñas se almacenan de forma segura
- Solo los administradores pueden ver información sensible
- Todas las comunicaciones están protegidas

---

## 📞 Contacto

**Dojo Koi-Do**
- Dirección: Contiguo al Condominio La Constancia, Boulevard San Antonio, del Cementerio 100 oeste y 25 norte, local 1 y 2, San José Province, San Antonio, 10305
- Teléfono: +506 8543 9138
- Email: info@dojokoido.com
- Sitio web: www.dojokoido.com

---

¡Gracias por usar nuestra plataforma! Esperamos que tengas una excelente experiencia en el Dojo Koi-Do.
