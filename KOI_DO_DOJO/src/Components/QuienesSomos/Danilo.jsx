import React from 'react'
import '/src/Styles/QuienesSomos/Danilo.css';

function Danilo() {
  return (
    <div className="FichaContainer">
      <div className="FichaImagen">
        <img 
          src="../src/Images/LayerQuienesSomos/Danilo.png" 
          alt="Sensei Danilo" 
        />
      </div>
      <div className="FichaInfo">
        <h1 className='Encargado'>Encargado Desamparados Dojo Operador</h1>
        <h2 className="FichaNombre">Sensei Danilo (Tanque) Vega Barrantes</h2>
        <p className="FichaExperiencia">
          Cuenta con 32 años de experiencia en deportes de contacto.
        </p>
        <ul className="FichaLogros">
          <li>Cinturón negro de Tae Kwon-Do</li>
          <li>Cinturón negro de Kickboxing 3er Dan</li>
          <li>Cinturón negro de Karate Kyokushin 2do Dan</li>
          <li>Cinturón morado de BJJ</li>
          <li>Campeón Panamericano de MMA en Panamá</li>
          <li>Campeón Mundial de Karate Kyokushin en Japón</li>
        </ul>
        <p className="FichaHistoria">
          Koi-Do Dojo se inicia con Karate un 07 de febrero de 2023, con la expectativa de crecer el deporte del Budo Karate Kyokushin Kenbukai en Desamparados.
        </p>
      </div>
    </div>
  );
}

export default Danilo;

