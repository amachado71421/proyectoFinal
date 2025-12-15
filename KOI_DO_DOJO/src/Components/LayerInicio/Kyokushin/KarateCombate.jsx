import React from "react";
import '/src/Styles/Kyokushin/KarateCombate.css';

export default function KarateCombate() {
    return (
        <section className="combate-wrapper">

            {/* Imagen decorativa esquinas superiores */}
            <img src="../src/Images/KyokushinInicio/EsquinaSinFondoIzq.png" alt="" className="corner corner-top-left" />
            

            {/* Fondo semicírculo claro */}
            <img src="../src/Images/KyokushinInicio/fondo.png" alt="" className="background-semicircle" />

            <div className="combate-content">

                {/* Sol rojo detrás */}
                <img src="../src/Images/KyokushinInicio/SolRojo.png" alt="" className="red-sun" />

                {/* Imagen principal (persona o acción) */}
                <img
                    src="../src/Images/KyokushinInicio/karate.png"
                    alt="Kumite Kyokushin"
                    className="main-figure"
                />

                {/* Texto */}
                <div className="text-box">
                    <h1 className="combate-title">El Combate (Kumite)</h1>
                    <p className="combate-desc">
                        El combate en Kyokushin es a <strong>contacto completo (full contact)</strong>,
                        siendo una de las características que lo diferencian de otros estilos de karate.
                        Los puños al rostro están prohibidos, pero se permiten patadas, rodillazos y
                        golpes al cuerpo y cabeza. La resistencia física y mental son esenciales:
                        no se trata solo de golpear, sino de mantenerse firme ante la adversidad.
                    </p>
                </div>

                {/* Sakura tree decorativo */}
                <img src="../src/Images/KyokushinInicio/SakuraDer.png" alt="" className="sakura" />
            </div>

            {/* Esquinas inferiores */}
            <img src="../src/Images/KyokushinInicio/EsquinaSinFondoDer.png" alt="" className="corner corner-bottom-right" />

        </section>
    );
}
