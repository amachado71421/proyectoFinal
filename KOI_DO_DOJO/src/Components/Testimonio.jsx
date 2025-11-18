import React from 'react';
import "../Styles/Testimonio.css";

const Testimonio = ({ testimonio, imagen, nombre, puesto }) => {
  return (
    <>


      <div className="ContenedorTestimonio">

        <div className="ContenedorComentarios">
          <p className="Comentario">{testimonio}"El sensei Danilo Vega es una inspiración. Su dedicación y forma de enseñar me han ayudado a superar mis límites tanto dentro como fuera del dojo. ¡El KOI-DO DOJO es mi segundo hogar!"</p>
        </div>

        <div className='ContenedorSegmento2'>
          <div className="ContenedorImagen">
            <img className="TestimonioImg" src={imagen}  alt="Imagen Comentario"  src="../src/Images/Andrés Gómez.png"/>

            <h2 className='Nombre'>{nombre}Andrés Gómez</h2>
            <h3 className='Puesto'>{puesto} Cinturón Amarillo</h3>
          </div>
        </div>

      </div>
    </>
  );
};

export default Testimonio;
