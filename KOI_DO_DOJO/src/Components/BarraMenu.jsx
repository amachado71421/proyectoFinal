import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '/src/Styles/Barra.css';
import TokenRefresher from '../Components/Perfil/TokenRefresher';
import { AuthContext } from '../../Context/AuthContext';

async function silentFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    return { ok: false, status: 0 };
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return undefined;
}

function BarraMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth } = useContext(AuthContext);

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  // 🔹 Verificar autenticación al montar
  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        const res = await silentFetch('http://localhost:8000/api/auth/me/', {
          method: 'GET',
          credentials: 'include',
        });
        if (!mounted) return;
        setIsAuthenticated(res.ok);
      } catch {
        if (mounted) setIsAuthenticated(false);
      }
    };

    checkUser();
    return () => { mounted = false; };
  }, []);

  // 🔹 Manejar logout
  const handleLogout = async () => {
    // Llamada logout al backend
    await silentFetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json', 
        'X-CSRFToken': getCookie('csrftoken') || '' 
      },
    });

    // Limpiar cookies de sesión y CSRF
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // Limpiar sessionStorage para recarga de UserProfile
    sessionStorage.removeItem('profileReloaded');

    // Actualizar estados y AuthContext
    setIsAuthenticated(false);
    setLoggedOut(true);
    checkAuth(); // fuerza refresco de AuthContext

    // Redirigir al inicio
    navigate('/');
  };

  const menuItems = [
    { path: "/", label: "Inicio", icon: "../src/Images/INICIO.png" },
    { path: isAuthenticated ? "/Perfil" : "/loginregister", label: "Perfil", icon: "../src/Images/PERFIL2.png" },
    { path: "/QuienesSomos", label: "Integrantes", icon: "../src/Images/NOSOTROS.png" },
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
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => { navigate(item.path); setIsOpen(false); }}
              >
                <img className="Icono" src={item.icon} alt={item.label} />
                <span className='Titulo'>{item.label}</span>
              </li>
              {index < menuItems.length - 1 && <div className="linea-vertical"></div>}
            </React.Fragment>
          ))}

          {isAuthenticated && (
            <li
              className={`menu-item ${location.pathname === '/logout' ? 'active' : ''}`}
              onClick={handleLogout}
            >
              <img className="Icono" src="../src/Images/LOCKOUT.png" alt="Log Out" />
              <span className='Titulo'>Log Out</span>
            </li>
          )}
        </ul>
      </main>

      {isAuthenticated && !loggedOut && (
        <TokenRefresher
          onRefresh={() => setIsAuthenticated(true)}
          onLogout={handleLogout}
          loggedOut={loggedOut}
        />
      )}
    </div>
  );
}

export default BarraMenu;
