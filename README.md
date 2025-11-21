# 🥋 Plataforma Web Dojo Koi-Do

Este proyecto es una plataforma web para la gestión del dojo Koi-Do.  
Incluye funcionalidades de reservas, eventos, perfiles de usuarios, calendario interactivo y autenticación segura con JWT en cookies HttpOnly.

---

## 🚀 Tecnologías utilizadas

### Frontend
- **React**: construcción modular y dinámica de la interfaz de usuario, con componentes reutilizables y escalables.
- **React Router**: gestión de la navegación interna sin recargar la página, mejorando la fluidez de la experiencia.
- **CSS**: estilos y diseño visual coherente, adaptable a distintos dispositivos.
- **React Icons**: integración de íconos personalizables en los componentes de React.
- **EmailJS**: envío de correos electrónicos directamente desde el frontend (formularios de contacto, confirmaciones de reservas, notificaciones).
- **@fullcalendar/core**: motor principal del calendario para renderizar y manejar eventos.
- **@fullcalendar/react**: integración de FullCalendar como componente declarativo en React.
- **@fullcalendar/daygrid**: vista clásica mensual en cuadrícula para clases y eventos.
- **@fullcalendar/timegrid**: vistas de semana y día con división por horas, útil para reservas específicas.
- **@fullcalendar/list**: visualización de eventos en formato de lista lineal.
- **@fullcalendar/interaction**: interactividad avanzada (clic en fechas, arrastrar y soltar, redimensionar eventos).
- **@fullcalendar/multimonth**: visualización de varios meses en paralelo para planificación a largo plazo.

### Backend
- **Django**: framework para la lógica del servidor, autenticación, seguridad, administración de datos y creación de APIs.
- **Django REST Framework (DRF)**: exposición de APIs REST seguras y estructuradas para comunicación con el frontend.
- **Simple JWT (JSON Web Token)**: autenticación basada en tokens, con soporte para refresco y cookies HttpOnly.
- **CSRF (Cross-Site Request Forgery Protection)**: protección contra ataques de falsificación de solicitudes en Django.
- **HttpOnly Cookies**: almacenamiento seguro de tokens de autenticación, inaccesibles desde JavaScript.
- **django-cors-headers**: habilitación de CORS para permitir comunicación segura entre frontend y backend.

### Base de datos
- **MySQL**: sistema de gestión de bases de datos relacional para almacenar usuarios, reservas, eventos, horarios e instructores.

### Herramientas de desarrollo
- **GitHub**: control de versiones y colaboración entre el equipo, con historial de cambios y trabajo en ramas.
- **Postman**: pruebas de APIs y base de datos, facilitando el manejo y edición de información.

---

## 📂 Arquitectura general

- **Frontend (React + FullCalendar + EmailJS)** → Interfaz interactiva y dinámica.
- **Backend (Django + DRF + JWT + CSRF + CORS)** → Lógica de negocio, seguridad y APIs.
- **Base de datos (MySQL)** → Almacenamiento estructurado de información.
- **Herramientas (GitHub + Postman)** → Control de versiones y pruebas.

---

## 🔐 Seguridad implementada

- Autenticación con **JWT** en cookies **HttpOnly**.
- Protección contra ataques **CSRF**.
- Configuración de **CORS** para comunicación segura entre dominios.
- Tokens de acceso con expiración corta y refresco automático.

---

## 📅 Funcionalidades principales

- Gestión de usuarios y perfiles.
- Reservas de clases y eventos.
- Calendario interactivo con múltiples vistas.
- Envío de correos de confirmación y notificaciones.
- Panel administrativo para instructores y organizadores.

---

## 👨‍💻 Equipo y colaboración

El proyecto se desarrolla en equipo utilizando **GitHub** para control de versiones y coordinación.  
Las pruebas de APIs y base de datos se realizan con **Postman** para asegurar calidad y consistencia.

---
