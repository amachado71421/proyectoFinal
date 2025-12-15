import React from "react";
import "/src/Styles/Kyokushin/KyokushinEntrenamiento.css";

export default function KyokushinEntrenamiento() {
    return (
        <section className="entrenamiento-section">
            
            <h2 className="entrenamiento-title">
                Entrenamiento y vida diaria
            </h2>

            <div className="entrenamiento-grid">

                {/* TEXTO A LA IZQUIERDA */}
                <div className="entrenamiento-text">
                    <p>
                        El <strong>Kyokushin</strong> enseña que el dojo es un reflejo de la vida.
                        Cada técnica, cada kata, es una oportunidad para perfeccionarse y superar los propios límites.
                        El entrenamiento no termina cuando acaba la clase: continúa en la disciplina diaria y en la forma de enfrentar los retos con el corazón fuerte.
                    </p>

                    <p>
                        La constancia, la humildad y el esfuerzo diario forman parte del camino.
                        El verdadero progreso ocurre fuera de la zona de confort y exige compromiso con uno mismo.
                    </p>
                </div>

                {/* IMAGEN A LA DERECHA */}
                <div className="entrenamiento-img-container">
                    <img
                        src="/src/Images/KyokushinInicio/EntrenamientoImg.png"
                        alt="Karate Kyokushin"
                        className="entrenamiento-img"
                    />
                </div>

            </div>

        </section>
    );
}
