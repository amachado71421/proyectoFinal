import React from 'react'
import "../../Styles/LayerInicio/ArtesMarciales.css";


function Marciales() {
    return (
        <div className="ArtesMarciales">
            <h1 className="TituloMarciales">Nuestras disciplinas:</h1>
            <p className="SubtituloMarciales">
                "De la tradición al combate moderno: Karate, Kickboxing y MMA"
            </p>

            <div className="ContenedorPiramide">
                <div className="FilaSuperior">
                    <img className="ImgEntreno" src="../src/Images/Karate.png" alt="Kickboxing" />
                    <img className="ImgEntreno" src="../src/Images/Kickboxing.png"  alt="Karate" />
                </div>
                <div className="FilaInferior">
                    <img className="ImgEntreno" src="../src/Images/MMA.png" alt="MMA" />
                </div>
            </div>
        </div>  
    );
}

export default Marciales;

