import '/src/Styles/Kyokushin/KyokushinIntroduccion.css';

export default function KyokushinIntroduccion() {
    return (
        <section className="intro-section">

            <div className="intro-container">

                {/* COLUMNA IZQUIERDA */}
                <div className="intro-left">

                    <h2 className="intro-title">¿Qué es el Kyokushin Karate?</h2>

                    <p className="intro-description">
                        El <strong>Kyokushin Karate (極真空手)</strong>, creado por el maestro
                        <strong> Masutatsu Oyama</strong> en Japón durante la década de 1950,
                        es mucho más que un arte marcial: es una filosofía de vida. Su nombre significa
                        <em> “la verdad absoluta”</em>, y representa la búsqueda constante de la perfección
                        física, mental y espiritual. Es reconocido mundialmente por su disciplina,
                        contacto real y formación integral.
                    </p>

                    {/* TARJETAS */}
                    <div className="intro-cards">

                        <div className="intro-card">
                            <div className="circle">1</div>
                            <h3>Un Legado de Disciplina</h3>
                            <p>
                                Fundado por el Maestro Oyama, el Kyokushin nació con una visión
                                de contacto pleno y disciplina inquebrantable.
                            </p>
                        </div>

                        <div className="intro-card">
                            <div className="circle">2</div>
                            <h3>La Verdad Absoluta</h3>
                            <p>
                                Su nombre simboliza la búsqueda constante de honestidad y autenticidad
                                en la vida y el entrenamiento.
                            </p>
                        </div>

                        <div className="intro-card">
                            <div className="circle">3</div>
                            <h3>Perfección Integral</h3>
                            <p>
                                Representa el perfeccionamiento físico, mental y espiritual
                                para transformar al individuo completamente.
                            </p>
                        </div>

                        <div className="intro-card">
                            <div className="circle">4</div>
                            <h3>Contacto y Fortaleza</h3>
                            <p>
                                Reconocido mundialmente por el contacto real y su entrenamiento riguroso,
                                forjando fortaleza interna y externa.
                            </p>
                        </div>

                    </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="intro-right">
                    <img
                        src="../src/Images/KyokushinInicio/MaeKarate.png"
                        alt="Karate Kyokushin"
                        className="intro-img"
                    />
                </div>

            </div>
        </section>
    );
}
