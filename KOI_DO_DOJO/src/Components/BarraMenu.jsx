import React from 'react'
import { useNavigate } from 'react-router-dom'
import '/src/Styles/Barra.css';

function BarraMenu() {
  const navigate = useNavigate()
  return (
    <div>
      <main className='Menu'>
        <img className="Logo" src="../src/Images/LogoFinal2.png" alt="Logo" />
        <ul className="Inicio Elementos">
          <li className="menu-item">
            <img className="Icono" src="../src/Images/INICIO.png" alt="IconoInicio" onClick={() => navigate("/")} />
            <span className='Titulo' onClick={() => navigate("/")}>Inicio</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/PERFIL2.png" alt="IconoPerfil" onClick={() => navigate("/Perfil")} />
            <span className='Titulo' onClick={() => navigate("/Perfil")}>Perfil</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/NOSOTROS.png" alt="IconoNosotros" onClick={() => navigate("/QuienesSomos")}/>
            <span className='Titulo' onClick={() => navigate("/QuienesSomos")}>¿Quienes Somos?</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/DOJO.png" alt="IconoDojo" onClick={() => navigate("/Dojo")} />
            <span className='Titulo' onClick={() => navigate("/Dojo")}>Dojo</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/CALENDARIO.png" alt="IconoCalendario" onClick={() => navigate("/Calendario")}/>
            <span className='Titulo' onClick={() => navigate("/Calendario")}>Calendario</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/EVENTOS.png" alt="IconoEventos" onClick={() => navigate("/Eventos")} />
            <span className='Titulo' onClick={() => navigate("/Eventos")}>Eventos</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/RANKING.png" alt="IconoRanking"  onClick={() => navigate("/Ranking")} />
            <span className='Titulo' onClick={() => navigate("/Ranking")}>Ranking</span>
          </li>
          <div class="linea-vertical"></div>
          <li className="menu-item">
            <img className="Icono" src="../src/Images/CONTACTENOS.png" alt="IconoContactenos" onClick={() => navigate("/Contactenos")}/>
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
