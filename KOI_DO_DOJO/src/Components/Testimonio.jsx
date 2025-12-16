import React from 'react';
import '../Styles/Testimonio.css';
import comillasImg from '../Images/comillas1.png';
import andresImg from '../Images/Andrés Gómez.png';

const Testimonio = () => {
    return (
        <div className="ContenedorTestimonio">
            {/* ICONO COMILLAS */}
            <img className="comillas" src={comillasImg} alt="Comillas decorativas" />

            {/* TEXTO DEL TESTIMONIO */}
            <div className="ContenedorComentarios">
                <p className="Comentario">
                    "El sensei Danilo Vega es una inspiración.
                    Su dedicación y forma de enseñar me han ayudado a superar mis límites
                    tanto dentro como fuera del dojo. ¡El KOI-DO DOJO es mi segundo hogar!"
                </p>
            </div>

            {/* AUTOR DEL TESTIMONIO */}
            <div className="ContenedorSegmento2">
                <div className="ContenedorImagen">
                    <img
                        className="TestimonioImg"
                        src={andresImg}
                        alt="Foto de Andrés Gómez"
                    />
                    <h2 className="Nombre">Andrés Gómez</h2>
                    <h3 className="Puesto">Cinturón Amarillo</h3>
                </div>
            </div>
        </div>
    );
};

export default Testimonio;
