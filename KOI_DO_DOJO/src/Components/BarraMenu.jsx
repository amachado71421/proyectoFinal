import React from 'react'
import { useNavigate } from 'react-router-dom'
import '/src/Styles/Barra.css';

function BarraMenu() {
  const navigate = useNavigate()
  return (
    <div>
      <main className='Menu'>
        <img className="Logo" src="../src/Images/LOGO.png" alt="Logo" />
        <ul className="Inicio Elementos">
          <li className="menu-item" onClick={() => navigate("/")}>
            <img className="Icono" src="../src/Images/INICIO.png" alt="IconoInicio" />
            <span className='Titulo'>Inicio</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item" onClick={() => navigate("/Perfil")}>
            <img className="Icono" src="../src/Images/PERFIL2.png" alt="IconoPerfil" />
            <span className='Titulo'>Perfil</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item" onClick={() => navigate("/QuienesSomos")}>
            <img className="Icono" src="../src/Images/NOSOTROS.png" alt="IconoNosotros" />
            <span className='Titulo'>¿Quienes Somos?</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item"onClick={() => navigate("/Dojo")}>
            <img className="Icono" src="../src/Images/DOJO.png" alt="IconoDojo" />
            <span className='Titulo'>Dojo</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item" onClick={() => navigate("/Calendario")}>
            <img className="Icono" src="../src/Images/CALENDARIO.png" alt="IconoCalendario" />
            <span className='Titulo'>Calendario</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item" onClick={() => navigate("/Eventos")}>
            <img className="Icono" src="../src/Images/EVENTOS.png" alt="IconoEventos" />
            <span className='Titulo' >Eventos</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item" onClick={() => navigate("/Ranking")}>
            <img className="Icono" src="../src/Images/RANKING.png" alt="IconoRanking" />
            <span className='Titulo'>Ranking</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item" onClick={() => navigate("/Contactenos")}>
            <img className="Icono" src="../src/Images/CONTACTENOS.png" alt="IconoContactenos" />
            <span className='Titulo'>Contactenos</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item" onClick={() => navigate("/LogOut")}>
            <img className="Icono" src="../src/Images/LOCKOUT.png" alt="IconoLogout" />
            <span className='Titulo'>Log Out</span>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default BarraMenu
