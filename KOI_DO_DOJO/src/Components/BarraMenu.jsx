import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Styles/Barra.css';

function BarraMenu() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Verifica autenticación preguntando al backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/auth/me/', {
          method: 'GET',
          credentials: 'include', // envía las cookies HttpOnly
        });
        setIsAuthenticated(res.ok); // true si el backend reconoce la cookie
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

const handleLogout = async () => {
  try {
    await fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
    });
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
  } finally {
    setIsAuthenticated(false);
    navigate('/');
  }
};


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const menuItems = [
  { path: "/", label: "Inicio", icon: "../src/Images/INICIO.png" },
  { path: "/loginregister", label: "Perfil", icon: "../src/Images/PERFIL2.png" },
  { path: "/QuienesSomos", label: "¿Quienes Somos?", icon: "../src/Images/NOSOTROS.png" },
  { path: "/Dojo", label: "Dojo", icon: "../src/Images/DOJO.png" },
  { path: "/Calendario", label: "Calendario", icon: "../src/Images/CALENDARIO.png" },
  { path: "/Eventos", label: "Eventos", icon: "../src/Images/EVENTOS.png" },
  { path: "/Contactenos", label: "Contactenos", icon: "../src/Images/CONTACTENOS.png" },
];

return (
  <div>
    <main className='Menu'>
      <img className="Logo" src="../src/Images/LogoFinal2.png" alt="Logo" />

      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`Inicio Elementos ${isOpen ? "open" : ""}`}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <li
              className="menu-item"
              onClick={() => { navigate(item.path); setIsOpen(false); }}
            >
              <img className="Icono" src={item.icon} alt={item.label} />
              <span className='Titulo'>{item.label}</span>
            </li>
            {index < menuItems.length - 1 && <div className="linea-vertical"></div>}
          </React.Fragment>
        ))}

        {isAuthenticated && (
          <li className="menu-item" onClick={handleLogout}>
            <img className="Icono" src="../src/Images/LOCKOUT.png" alt="Log Out" />
            <span className='Titulo'>Log Out</span>
          </li>
        )}
      </ul>
    </main>
  </div>
);
}

export default BarraMenu;
