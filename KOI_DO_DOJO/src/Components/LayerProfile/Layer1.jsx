import React from 'react'
import '/src/Styles/LayerProfile/Layer1.css';

function Layer1() {
    return (
        <div className='Layer1'>
    <img 
        className='ImgLayer1' 
        src="../src/Images/LayerProfile/Layer1Img.png" 
        alt="RegistroDojo" 
    />

    <div className='TituloEncima'>
        <h1 className='TituloLayer1'>
            Bienvenido al registro de Koi Do Dojo de Karate
        </h1>

        <p className='TituloLayer1'>
            Tu camino hacia la maestría comienza aquí. 
            Descubre la disciplina ancestral del karate.
        </p>
    </div>
</div>

    )
}

export default Layer1