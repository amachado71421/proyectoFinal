import React from 'react'
import { useNavigate } from 'react-router-dom'
import '/src/Styles/Barra.css';

function BarraMenu() {
  const navigate = useNavigate()
  
  const menuItems = [
    { path: "/", label: "Inicio", icon: "../src/Images/INICIO.png" },
    { path: "/Perfil", label: "Perfil", icon: "../src/Images/PERFIL2.png" },
    { path: "/QuienesSomos", label: "¿Quienes Somos?", icon: "../src/Images/NOSOTROS.png" },
    { path: "/Dojo", label: "Dojo", icon: "../src/Images/DOJO.png" },
    { path: "/Calendario", label: "Calendario", icon: "../src/Images/CALENDARIO.png" },
    { path: "/Eventos", label: "Eventos", icon: "../src/Images/EVENTOS.png" },
    { path: "/Ranking", label: "Ranking", icon: "../src/Images/RANKING.png" },
    { path: "/Contactenos", label: "Contactenos", icon: "../src/Images/CONTACTENOS.png" },
    { path: "/LogOut", label: "Log Out", icon: "../src/Images/LOCKOUT.png" }
  ]

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
        </ul>
      </main>
    </div>
  )
}

export default BarraMenu