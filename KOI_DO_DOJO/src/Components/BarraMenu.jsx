import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Barra.css";

function BarraMenu() {
  const navigate = useNavigate()
  return (
    <div>
      <main className='Menu'>
        <img className="Logo" src="../src/Images/LOGO.png" alt="Logo" />
        <ul className="Inicio Elementos">
          <li className="menu-item">
            <img className="Icono" src="../src/Images/INICIO.png" alt="IconoInicio" />
            <span className='Titulo' onClick={() => navigate("/")}>Inicio</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/PERFIL2.png" alt="IconoPerfil" />
            <span className='Titulo' onClick={() => navigate("/Perfil")}>Perfil</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/NOSOTROS.png" alt="IconoNosotros" />
            <span className='Titulo' onClick={() => navigate("/QuienesSomos")}>¿Quienes Somos?</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/DOJO.png" alt="IconoDojo" />
            <span className='Titulo' onClick={() => navigate("/Dojo")}>Dojo</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/CALENDARIO.png" alt="IconoCalendario" />
            <span className='Titulo' onClick={() => navigate("/Calendario")}>Calendario</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/EVENTOS.png" alt="IconoEventos" />
            <span className='Titulo' onClick={() => navigate("/Eventos")}>Eventos</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/RANKING.png" alt="IconoRanking" />
            <span className='Titulo' onClick={() => navigate("/Ranking")}>Ranking</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/CONTACTENOS.png" alt="IconoContactenos" />
            <span className='Titulo' onClick={() => navigate("/Contactenos")}>Contactenos</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/LOCKOUT.png" alt="IconoLogout" />
            <span className='Titulo' onClick={() => navigate("/LogOut")}>Log Out</span>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default BarraMenu
