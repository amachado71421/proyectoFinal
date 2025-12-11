import '/src/Styles/Kyokushin/KyokushinFundador.css';

export default function KyokushinFundador() {
    return (
        <section className="fundador seccion">
            <div className="fundador-contenido">
                <img
                    src="../src/Images/KyokushinInicio/oyama.png"
                    alt="Masutatsu Oyama"
                    className="fundador-img"
                />

                <div className="fundador-texto">
                    <h2>Fundador: Masutatsu Oyama</h2>

                    <p>
                        <strong>Masutatsu Oyama (1923–1994)</strong> nació en Corea y desde
                        joven se dedicó al estudio de las artes marciales. Tras años de
                        entrenamiento intenso, desarrolló un estilo propio basado en la
                        fuerza, la técnica y la resistencia mental.
                    </p>

                    <p>
                        Oyama era conocido por sus demostraciones extremas —como romper
                        piedras, árboles o enfrentarse a toros—, lo cual simbolizaba el
                        poder del espíritu humano cuando se combina con la disciplina.
                    </p>

                    <h3 className="cita">“Un hombre que no teme la verdad, no teme a nada.”</h3>
                </div>
            </div>
        </section>
    );
}
