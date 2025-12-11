import '/src/Styles/Kyokushin/KyokushinFilosofia.css';

import React from "react";

export default function KyokushinFilosofia() {
    return (
        <section className="filosofia seccion">
            <h2>Filosofía del Kyokushin</h2>

            <div className="filosofia-bloques">
                
                <div className="bloque">
                    <img className='IconoFilosofia' src="../src/Images/KyokushinInicio/espiritu.png" alt="" />
                    <h3>1. Espíritu fuerte (Osu no Seishin)</h3>
                    <p>
                        “Osu” resume la esencia del Kyokushin. Significa perseverar, resistir y seguir adelante pese al dolor y las dificultades.
                        Cada vez que un karateka dice “Osu”, expresa respeto, humildad y determinación: la voz del espíritu inquebrantable.
                    </p>
                </div>

                <div className="bloque">
                    <img className='IconoFilosofia' src="../src/Images/KyokushinInicio/entrenador.png" alt="" />
                    <h3>2. Entrenamiento riguroso (Keiko)</h3>
                    <p>
                        A través del kihon, kata y kumite, el practicante desarrolla fuerza, técnica, concentración y autocontrol.
                        La verdadera victoria no es sobre el oponente, sino sobre uno mismo.
                    </p>
                </div>

                <div className="bloque">
                    <img className='IconoFilosofia' src="../src/Images/KyokushinInicio/humildad.png" alt="" />
                    <h3>3. Respeto y humildad (Rei)</h3>
                    <p>
                        En cada saludo y práctica se cultiva el respeto hacia el maestro, los compañeros y el arte.
                        La humildad es la base del crecimiento personal; la cortesía y la disciplina son tan importantes como la fuerza.
                    </p>
                </div>

            </div>
        </section>
    );
}
