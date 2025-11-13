import React from 'react'
import "../Styles/ArtesMarciales.css";


function Marciales() {
    return (
        <div className='ArtesMarciales'>
            <h1 className='TituloMarciales'>Nuestras disciplinas:</h1>
            <p className='TituloMarciales'>"De la tradición al combate moderno: Karate, Kickboxing y MMA"</p>
            <div className="ContenedorEntreno">
                <img className="ImgEntreno" src="../src/Images/Kickboxing.png" alt="Kickboxing" />
                <img className="ImgEntreno" src="../src/Images/Karate.png" alt="Karate" />
                <img className="ImgEntreno" src="../src/Images/MMA.png" alt="MMA" />
            </div>
        </div>
    )
}

export default Marciales