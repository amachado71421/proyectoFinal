// src/components/LayerDojo/FilosofiaDojo.jsx
import React from "react";
import "/src/Styles/LayerDojo/FilosofiaDojo.css";

export default function FilosofiaDojo() {
    return (
        <section className="filosofia-section">
            <div className="filosofia-container">

                {/* TÍTULO */}
                <h1 className="filosofia-title">
                    Filosofía y Tradición en Nuestro Dojo
                </h1>

                {/* DESCRIPCIÓN PRINCIPAL */}
                <p className="filosofia-description">
                    Inspirados en la profunda filosofía zen y el honorable código del guerrero samurái (bushidō),
                    promovemos no solamente la perfección técnica física sino también la preparación mental,
                    ética y espiritual. Cada práctica es una oportunidad para cultivar virtudes como el coraje,
                    la benevolencia, el respeto, la sinceridad, el honor, la lealtad y el autocontrol.
                </p>

                {/* CUADRO DE 4 VALORES */}
                <div className="filosofia-grid">

                    <div className="filosofia-item">
                        <h3 className="filosofia-item-title">Rei (礼)</h3>
                        <p className="filosofia-item-text">Cortesía y respeto hacia todos los seres</p>
                    </div>

                    <div className="filosofia-item">
                        <h3 className="filosofia-item-title">Sōji (掃除)</h3>
                        <p className="filosofia-item-text">
                            Limpieza ritual del espacio como meditación activa
                        </p>
                    </div>

                    <div className="filosofia-item">
                        <h3 className="filosofia-item-title">Budō (武道)</h3>
                        <p className="filosofia-item-text">
                            El camino del guerrero hacia la iluminación
                        </p>
                    </div>

                    <div className="filosofia-item">
                        <h3 className="filosofia-item-title">Mushin (無心)</h3>
                        <p className="filosofia-item-text">
                            Mente sin mente, fluir sin resistencia
                        </p>
                    </div>

                </div>

                {/* LÍNEA DE NÚMEROS */}
                <div className="filosofia-line">
                    <span className="line-number">1</span>
                    <span className="line-number">2</span>
                    <span className="line-number">3</span>
                    <span className="line-number">4</span>
                </div>

                {/* CITA FINAL */}
                <p className="filosofia-cita">
                    "La limpieza ritual (sōji) es parte fundamental de nuestra práctica diaria, enseñando
                    responsabilidad colectiva y respeto profundo hacia el espacio compartido y nuestros compañeros
                    de entrenamiento. Nuestro dojo es un espacio donde se cultiva el cuerpo, la mente y el espíritu,
                    siguiendo fielmente el camino del budō."
                </p>

            </div>
        </section>
    );
}
