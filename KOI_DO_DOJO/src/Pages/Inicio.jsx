import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Marciales from '../Components/Marciales.jsx'
import CarruselInicio from '../Components/CarruselInicio.jsx'
import KyokushinTexto from '../Components/KyokushinTexto.jsx'
import "../Styles/Inicio.css";

function Home() {
  return (
    <div>
        <BarraMenu/>
        <div className='EspacioCarrusel'> 
        <CarruselInicio/>
        </div>
        <Marciales/>
        <KyokushinTexto/>
    </div>
  )
}

export default Home