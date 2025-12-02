import React from "react";
import '/src/Styles/LayerDojo/LayerDojo2.css';

function LayerDojo2() {
    return (
        <div className="DojoSection">

            {/* ===== TÍTULO ===== */}
            <h1 className="DojoTitulo">¿Qué es un Dojo? El Lugar del Camino</h1>

            {/* ===== CONTENEDOR PRINCIPAL ===== */}
            <div className="DojoContenedor">

                {/* Imagen */}
                <div className="DojoImagenBox">
                    <img
                        src="../src/Images/LayerDojo/LayerDojo1.png"
                        alt="Dojo Tradicional"
                        className="DojoImagen"
                    />
                </div>

                {/* Texto */}
                <div className="DojoTexto">
                    <p>
                        El término japonés <strong>"dōjō" (道場)</strong> significa literalmente
                        "lugar del camino", un espacio sagrado dedicado a la práctica y
                        enseñanza de artes marciales tradicionales como Karate, Judo, Aikido
                        y más. Es mucho más que un simple gimnasio: representa un santuario
                        donde convergen disciplina, respeto mutuo y crecimiento personal bajo
                        la sabia guía de un sensei experimentado.
                    </p>

                    <p>
                        En nuestro dojo, cada elemento tiene un propósito y significado
                        profundo: el <strong>kamiza</strong> (asiento de honor del maestro), el
                        <strong>kamidana</strong> (altar espiritual que conecta con la tradición),
                        y la organización meticulosa de los estudiantes según su grado de
                        experiencia y dedicación al camino marcial.
                    </p>
                </div>
            </div>

            {/* ===== TARJETAS ===== */}
            <div className="DojoCards">

                <div className="DojoCard">
                    <img src="../src/Images/LayerDojo/Meditacion.png" className="DojoIcon" />
                    <h2 className="DojoCardTitulo">Espacio Sagrado</h2>
                    <p className="DojoCardTexto">Ambiente diseñado para concentración y respeto</p>
                </div>

                <div className="DojoCard">
                    <img src="../src/Images/LayerDojo/espadas.png" className="DojoIcon" />
                    <h2 className="DojoCardTitulo">Disciplina Total</h2>
                    <p className="DojoCardTexto">
                        Estructura tradicional japonesa en cada sesión
                    </p>
                </div>

                <div className="DojoCard">
                    <img src="../src/Images/LayerDojo/Guia.png" className="DojoIcon" />
                    <h2 className="DojoCardTitulo">Guía del Sensei</h2>
                    <p className="DojoCardTexto">
                        Maestría transmitida de generación en generación
                    </p>
                </div>

            </div>

        </div>
    );
}

export default LayerDojo2;
