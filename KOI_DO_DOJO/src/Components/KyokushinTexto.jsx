import React from 'react';
import '/src/Styles/KyokushinTexto.css';

function KyokushinTexto() {
    return (
        <div className="inicio-karate">
            {/* Banner principal */}
            <section className="banner">
                <img
                    src="../src/Images/KyokushinInicio/banner-dojo.jpg"
                    alt="Dojo Kyokushin"
                    className="banner-img"
                />
                <div className="banner-texto">
                    <h1>Kyokushin Karate</h1>
                    <p>El Camino de la Verdad Absoluta</p>
                </div>
            </section>

            {/* Introducción */}
            <section className="introduccion seccion">
                <h2>¿Qué es el Kyokushin Karate?</h2>
                <p>
                    El <strong>Kyokushin Karate (極真空手)</strong>, creado por el maestro <strong>Masutatsu Oyama</strong> en Japón durante la década de 1950,
                    es mucho más que un arte marcial: es una filosofía de vida. Su nombre significa <em>“la verdad absoluta”</em>, y representa la búsqueda constante de la perfección física, mental y espiritual.
                    El Kyokushin es reconocido mundialmente por su disciplina, contacto real y la formación integral que brinda a sus practicantes.
                </p>
            </section>

            {/* Fundador */}
            <section className="fundador seccion">
                <div className="fundador-contenido">
                    <img
                        src="../src/Images/KyokushinInicio/oyama.jpg"
                        alt="Masutatsu Oyama"
                        className="fundador-img"
                    />
                    <div className="fundador-texto">
                        <h2>Fundador: Masutatsu Oyama</h2>
                        <p>
                            <strong>Masutatsu Oyama (1923–1994)</strong> nació en Corea y desde joven se dedicó al estudio de las artes marciales.
                            Tras años de entrenamiento intenso, desarrolló un estilo propio basado en la fuerza, la técnica y la resistencia mental.
                            Oyama era conocido por sus demostraciones extremas —como romper piedras, árboles o enfrentarse a toros—, lo cual simbolizaba el poder del espíritu humano cuando se combina con la disciplina.
                        </p>
                        <h3 className="cita">“Un hombre que no teme la verdad, no teme a nada.”</h3>
                    </div>
                </div>
            </section>

            {/* Filosofía */}
            <section className="filosofia seccion">
                <h2>Filosofía del Kyokushin</h2>
                <div className="filosofia-bloques">
                    <div className="bloque">
                        <h3>1. Espíritu fuerte (Osu no Seishin)</h3>
                        <p>
                            “Osu” resume la esencia del Kyokushin. Significa perseverar, resistir y seguir adelante pese al dolor y las dificultades.
                            Cada vez que un karateka dice “Osu”, expresa respeto, humildad y determinación: la voz del espíritu inquebrantable.
                        </p>
                    </div>
                    <div className="bloque">
                        <h3>2. Entrenamiento riguroso (Keiko)</h3>
                        <p>
                            A través del kihon, kata y kumite, el practicante desarrolla fuerza, técnica, concentración y autocontrol.
                            La verdadera victoria no es sobre el oponente, sino sobre uno mismo.
                        </p>
                    </div>
                    <div className="bloque">
                        <h3>3. Respeto y humildad (Rei)</h3>
                        <p>
                            En cada saludo y práctica se cultiva el respeto hacia el maestro, los compañeros y el arte.
                            La humildad es la base del crecimiento personal; la cortesía y la disciplina son tan importantes como la fuerza.
                        </p>
                    </div>
                </div>
            </section>

            {/* Combate */}
            <section className="combate seccion">
                <img
                    src="../src/Images/KyokushinInicio/kumite.jpg"
                    alt="Kumite Kyokushin"
                    className="combate-img"
                />
                <div className="combate-texto">
                    <h2>El Combate (Kumite)</h2>
                    <p>
                        El combate en Kyokushin es a <strong>contacto completo (full contact)</strong>, siendo una de las características que lo diferencian de otros estilos de karate.
                        Los puños al rostro están prohibidos, pero se permiten patadas, rodillazos y golpes al cuerpo y cabeza.
                        La resistencia física y mental son esenciales: no se trata solo de golpear, sino de mantenerse firme ante la adversidad.
                    </p>
                </div>
            </section>

            {/* Entrenamiento diario */}
            <section className="entrenamiento seccion">
                <h2>Entrenamiento y vida diaria</h2>
                <p>
                    El Kyokushin enseña que el dojo es un reflejo de la vida.
                    Cada técnica, cada kata, es una oportunidad para perfeccionarse y superar los propios límites.
                    El entrenamiento no termina cuando acaba la clase: continúa en la disciplina diaria y en la forma de enfrentar los retos con el corazón fuerte.
                </p>
            </section>

            {/* Influencia */}
            <section className="influencia seccion">
                <h2>Influencia mundial</h2>
                <p>
                    Desde su creación, el Kyokushin ha influido en millones de practicantes y ha dado origen a nuevos estilos,
                    como <strong>Shinkyokushin, Enshin, Ashihara, Seidokaikan</strong> y otros sistemas modernos de combate.
                    Su enfoque en el realismo y la fuerza espiritual lo ha convertido en uno de los estilos de karate más respetados del mundo, practicado en más de 120 países.
                </p>
            </section>

            {/* Conclusión */}
            <section className="conclusion seccion">
                <h2>Conclusión</h2>
                <p>
                    El Kyokushin no es solo pelear; es buscar la verdad dentro de uno mismo.
                    A través del sudor, el respeto y la constancia, cada practicante se transforma, aprendiendo que la verdadera victoria es dominar el propio espíritu.
                </p>
                <h3 className="cita">“El camino del Kyokushin no tiene fin. Como la vida misma, es un viaje eterno hacia la superación personal.”</h3>
            </section>
        </div>
    );
}

export default KyokushinTexto;
