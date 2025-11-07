import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../Images/LOGO.png"
import '/src/Styles/Barra.css';

function BarraMenu() {
  const navigate = useNavigate()
  return (
    <div className='Menu' >
      <main>
        <img className="Logo" src={logo} alt="Logo" />
        <ul className="menu">
          <li className="menu-item">
            <img src="..\src\Images\INICIO.png" alt="IconoInicio" />
            <span onClick={() => navigate("/")}>Inicio</span>
          </li>
          <li className="menu-item">
            <img src="..\src\Images\PERFIL2.png" alt="IconoPerfil" />
            <span onClick={() => navigate("/Perfil")}>Perfil</span>
          </li>
          <li className="menu-item">
            <img src="..\src\Images\NOSOTROS.png" alt="IconoExplorar" />
            <span onClick={() => navigate("/QuienesSomos")}>Quienes Somos</span>
          </li>
          <li className="menu-item">
            <img src="..\src\Images\DOJO.png" alt="IconoMatch" />
            <span onClick={() => navigate("/Dojo")}>Dojo</span>
          </li>
          <li className="menu-item">
            <img src="..\src\Images\CALENDARIO.png" alt="IconoAjustes" />
            <span onClick={() => navigate("/Calendario")}>Calendario</span>
          </li>
          <li className="menu-item">
            <img src="..\src\Images\EVENTOS.png" alt="IconoAjustes" />
            <span onClick={() => navigate("/Eventos")}>Eventos</span>
          </li>
          <li className="menu-item">
            <img src="..\src\Images\RANKING.png" alt="IconoAjustes" />
            <span onClick={() => navigate("/Ranking")}>Ranking</span>
          </li>
          <li className="menu-item">
            <img src="..\src\Images\CONTACTENOS.png" alt="IconoAjustes" />
            <span onClick={() => navigate("/Contactenos")}>Contactenos</span>
          </li>
          <li className="menu-item">
            <img src="..\src\images\Iconos Menu Empleado\Log out.png" alt="IconoLogOut" />
            <span onClick={() => navigate("/")}>Log Out</span>
          </li>
        </ul>
      </main>
    

    </div>
  )
}

export default BarraMenu