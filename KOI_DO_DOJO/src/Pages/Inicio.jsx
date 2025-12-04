import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Marciales from '../Components/LayerInicio/Marciales.jsx'
import CarruselInicio from '../Components/LayerInicio/CarruselInicio.jsx'
import KyokushinTexto from '../Components/KyokushinTexto.jsx'
import InicioLayer from '../Components/LayerInicio/InicioLayer.jsx'
import "../Styles/Inicio.css";

function Home() {
  return (
    <div>
      <BarraMenu />
      <div className='EspacioCarrusel'>
        <CarruselInicio />
      </div>
      <InicioLayer />
      <Marciales />
      <KyokushinTexto />
    </div>
  )
}

export default Home