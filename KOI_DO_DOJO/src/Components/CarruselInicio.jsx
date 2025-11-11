import React, { useEffect, useState } from "react";
import "../Styles/Carrusel.css";

// 🔹 Importamos las imágenes
import Carrusel1 from "../Images/Carrusel/Carrusel1.jpg";
import Carrusel2 from "../Images/Carrusel/Carrusel2.jpg";
import Carrusel3 from "../Images/Carrusel/Carrusel3.jpg";
import Carrusel4 from "../Images/Carrusel/Carrusel4.jpg";
import Carrusel5 from "../Images/Carrusel/Carrusel5.jpg";

function CarruselInicio() {
  // 🔸 Lista de imágenes + texto correspondiente
  const slides = [
    { img: Carrusel1, texto: "Bienvenido a KOI DO DOJO" },
    { img: Carrusel2, texto: "Disciplina, respeto y superación" },
    { img: Carrusel3, texto: "Entrena tu cuerpo y tu mente" },
    { img: Carrusel4, texto: "Participa en nuestros eventos" },
    { img: Carrusel5, texto: "Forma parte de nuestra comunidad" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="CarruselInicio">
      <div
        className="CarruselTrack"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="CarruselSlide" key={index}>
            <img src={slide.img} alt={`Carrusel${index + 1}`} />
            <div className="CarruselTexto">
              <h2>{slide.texto}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="CarruselBotones">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? "activo" : ""}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default CarruselInicio;
