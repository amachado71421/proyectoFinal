import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Styles/Barra.css';

function BarraMenu() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Inicializa el estado al montar el componente
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    // Escucha cambios en localStorage (login/logout desde otros componentes)
    const handleStorageChange = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/perfil'); // redirige a la ruta de perfil tras cerrar sesión
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

          {isAuthenticated && (
            <>
              <li className="menu-item" onClick={handleLogout}>
                <img className="Icono" src="../src/Images/LOCKOUT.png" alt="Log Out" />
                <span className='Titulo'>Log Out</span>
              </li>
            </>
          )}
        </ul>
      </main>
    </div>
  );
}

export default BarraMenu;
