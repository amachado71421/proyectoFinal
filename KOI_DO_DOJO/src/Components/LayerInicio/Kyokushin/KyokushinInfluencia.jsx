import React from "react";
import '/src/Styles/Kyokushin/KyokushinInfluencia.css';

export default function KyokushinInfluencia() {
    return (
        <section className="influ-section">

            <div className="influ-container">
                
                <h2 className="influ-title">Influencia Global y Legado del Kyokushin</h2>

                <p className="influ-subtitle">
                    Desde su creación, el Kyokushin ha trascendido fronteras, impactando a millones de practicantes 
                    y dando origen a una nueva ola de estilos de combate. Su enfoque en el realismo y la inquebrantable 
                    fuerza espiritual lo han posicionado como un pilar en el mundo de las artes marciales.
                </p>

                {/* Tarjetas */}
                <div className="influ-cards">

                    {/* Card 1 */}
                    <div className="influ-card">
                        <img 
                            src="/src/Images/KyokushinInicio/influ1.png" 
                            alt="Expansión Mundial"
                            className="influ-img"
                        />
                        <h3>Expansión Mundial</h3>
                        <p>
                            El Kyokushin se practica en más de 120 países, un testimonio de su filosofía universal 
                            y su capacidad para unir a personas de todas las culturas bajo los principios del 
                            "contacto total".
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="influ-card">
                        <img 
                            src="/src/Images/KyokushinInicio/influ2.png" 
                            alt="Nuevos Estilos"
                            className="influ-img"
                        />
                        <h3>Raíz de Nuevos Estilos</h3>
                        <p>
                            Su disciplina ha sido la base para la formación de estilos prominentes como 
                            Shinkyokushin, Enshin, Ashihara y Seidokaikan, demostrando su influencia duradera 
                            y su adaptabilidad.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="influ-card">
                        <img 
                            src="/src/Images/KyokushinInicio/influ3.png" 
                            alt="Realismo y Espíritu"
                            className="influ-img"
                        />
                        <h3>Realismo y Espíritu</h3>
                        <p>
                            Reconocido por su entrenamiento de contacto real y su énfasis en la fortaleza mental 
                            y espiritual, el Kyokushin cultiva individuos con disciplina y resiliencia excepcionales.
                        </p>
                    </div>

                </div>
            </div>

        </section>
    );
}
