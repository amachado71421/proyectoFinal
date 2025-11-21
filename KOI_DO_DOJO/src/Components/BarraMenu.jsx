import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Styles/Barra.css';

function BarraMenu() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = no verificado aún

  // 🔐 Verifica autenticación solo si hay cookies
  useEffect(() => {
    const hasAccessToken = document.cookie.includes('access_token=');
    if (!hasAccessToken) {
      setIsAuthenticated(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/auth/me/', {
          method: 'GET',
          credentials: 'include',
        });

        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/logout/', {
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
    { path: "/Perfil", label: "Perfil", icon: "../src/Images/PERFIL2.png" },
    { path: "/QuienesSomos", label: "¿Quienes Somos?", icon: "../src/Images/NOSOTROS.png" },
    { path: "/Dojo", label: "Dojo", icon: "../src/Images/DOJO.png" },
    { path: "/Calendario", label: "Calendario", icon: "../src/Images/CALENDARIO.png" },
    { path: "/Eventos", label: "Eventos", icon: "../src/Images/EVENTOS.png" },
    { path: "/Ranking", label: "Ranking", icon: "../src/Images/RANKING.png" },
    { path: "/Contactenos", label: "Contactenos", icon: "../src/Images/CONTACTENOS.png" },
  ];

  return (
    <div>
      <main className='Menu'>
        <img className="Logo" src="../src/Images/LogoFinal2.png" alt="Logo" />
        <ul className="Inicio Elementos">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <li className="menu-item" onClick={() => navigate(item.path)}>
                <img className="Icono" src={item.icon} alt={item.label} />
                <span className='Titulo'>{item.label}</span>
              </li>
              {index < menuItems.length - 1 && <div className="linea-vertical"></div>}
            </React.Fragment>
          ))}

          {isAuthenticated === true && (
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
