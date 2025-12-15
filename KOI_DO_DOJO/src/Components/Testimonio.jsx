import React from 'react';
import '../Styles/Testimonio.css';
import comillasImg from '../Images/comillas1.png';

const Testimonio = ({ testimonio, imagen, nombre, puesto }) => {
    return (
        <div className="ContenedorTestimonio">

            {/* ICONO COMILLAS */}
            <img
                className="comillas"
                src={comillasImg} 
                alt="Comillas decorativas"
            />

            {/* TEXTO DEL TESTIMONIO */}
            <div className="ContenedorComentarios">
                <p className="Comentario">
                    {testimonio}
                </p>
            </div>

            {/* AUTOR DEL TESTIMONIO */}
            <div className="ContenedorSegmento2">
                <div className="ContenedorImagen">

                    <img
                        className="TestimonioImg"
                        src={imagen}
                        alt={`Foto de ${nombre}`}
                    />

                    <h2 className="Nombre">{nombre}</h2>
                    <h3 className="Puesto">{puesto}</h3>

                </div>
            </div>

        </div>
    );
};

export default Testimonio;
