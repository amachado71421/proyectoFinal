import '/src/Styles/LayerInicio/InicioLayer.css';

function InicioLayer() {
    return (
        <section className="inicio-section">

            {/* WRAPPER QUE LIMITA EL ANCHO */}
            <div className="inicio-wrapper">

                <div className="inicio-container">

                    {/* IMAGEN IZQUIERDA */}
                    <div className="inicio-img-wrapper">
                        <img
                            src="../src/Images/KaratekaRojo.png"
                            alt="Arte Marcial"
                            className="inicio-img"
                        />
                    </div>

                    {/* TEXTO DERECHO */}
                    <div className="inicio-content">

                        <h1 className="inicio-title">
                            El Arte<br />
                            Marcial<br />
                            como<br />
                            Camino de<br />
                            Vida
                        </h1>

                        {/* CITA */}
                        <div className="inicio-quote">
                            <span className="quote-symbol left">“</span>
                            <p>
                                Cada disciplina ofrece un camino único de desarrollo físico,
                                mental y espiritual que transforma profundamente a quien lo
                                recorre con dedicación.
                            </p>
                            <span className="quote-symbol right">”</span>
                        </div>

                        <h2 className="inicio-subtitle">
                            Tradición + Técnica<br />+ Filosofía
                        </h2>

                        <p className="inicio-text">
                            La combinación perfecta que inspira respeto, autodisciplina
                            y superación personal constante.
                        </p>

                        {/* IMAGEN PEQUEÑA */}
                        <div className="inicio-small-img-wrapper">
                            <img
                                src="../src/Images/gi-blanco.png"
                                alt="Gi artes marciales"
                                className="inicio-small-img"
                            />
                        </div>

                        <p className="inicio-text final">
                            ¡Empieza hoy tu viaje marcial y transforma tu vida!
                            Invita a explorar, practicar y vivir las artes marciales con pasión,
                            respeto y determinación inquebrantable.
                        </p>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default InicioLayer;
