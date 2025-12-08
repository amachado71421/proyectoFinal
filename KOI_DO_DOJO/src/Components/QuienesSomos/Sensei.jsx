import React from 'react'
import '/src/Styles/QuienesSomos/Sensei.css';

function Sensei() {
  return (
    <div className='EspacioCarrusel'>
      <div className='CarruselSensei'>

        {/* IZQUIERDA */}
        <div className='ComponenteSenseiIzq contenedor-overlay'>
          <img
            src="../src/Images/LayerQuienesSomos/SenseiIzq.png"
            className='SenseiIzq ImagenSensei'
            alt="SenseiIzq"
          />

          <div className='FraseSensei overlay'>
            <h1 className='TituloBlanco'>Guía</h1>
            <h1 className='TituloAmarillo'>Ejemplar</h1>
          </div>
        </div>

        {/* CENTRO */}
        <img
          src="../src/Images/LayerQuienesSomos/SenseiCentro.png"
          className='SenseiCentro ImagenSensei'
          alt="SenseiCentro"
        />

        {/* DERECHA */}
        <div className='ComponenteSenseiDer contenedor-overlay'>
          <img
            src="../src/Images/LayerQuienesSomos/SenseiDer.png"
            className='SenseiDer ImagenSensei'
            alt="SenseiDer"
          />

          <div className='FirmaTitulo overlay'>
            <img
              src="../src/Images/LayerQuienesSomos/Firma1.png"
              className='Firma'
              alt="Firma"
            />

            <h1 className='TituloAmarillo'>Sensei</h1>
            <h1 className='TituloBlanco'>Danilo</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sensei;
