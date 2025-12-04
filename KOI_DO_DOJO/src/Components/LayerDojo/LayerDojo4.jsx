// src/components/LayerDojo4.jsx
import React from "react";
import "/src/Styles/LayerDojo/LayerDojo4.css";

export default function LayerDojo4() {
    return (
        <section className="dojo4-section">

            <h1 className="dojo4-title">Horarios y Modalidades de Entrenamiento</h1>

            <div className="dojo4-top">

                {/* Bloque 1 */}
                <div className="dojo4-block dojo4-block-1">
                    <img
                        src="../src/Images/LayerDojo/clases1.png"
                        alt="Clases diversas"
                        className="dojo4-img dojo4-img-1"
                    />

                    <h2 className="dojo4-subtitle dojo4-subtitle-1">
                        Diversidad de Clases
                    </h2>

                    <p className="dojo4-text dojo4-text-1">
                        Ofrecemos un programa integral adaptado a todas las edades, niveles
                        de experiencia y objetivos personales. Desde los más pequeños que
                        inician su camino marcial hasta adultos que buscan disciplina,
                        defensa personal o competencia de alto nivel, tenemos la clase
                        perfecta para ti.
                    </p>
                </div>

                {/* Bloque 2 */}
                <div className="dojo4-block dojo4-block-2">
                    <img
                        src="../src/Images/LayerDojo/clases2.png"
                        alt="Flexibilidad moderna"
                        className="dojo4-img dojo4-img-2"
                    />

                    <h2 className="dojo4-subtitle dojo4-subtitle-2">
                        Flexibilidad Moderna
                    </h2>

                    <p className="dojo4-text dojo4-text-2">
                        Entendemos las demandas de la vida contemporánea. Por eso ofrecemos
                        entrenamiento presencial tradicional complementado con opciones
                        híbridas innovadoras, seguimiento personalizado online, y programas
                        flexibles que se adaptan a tu horario laboral o académico.
                    </p>
                </div>
            </div>

            {/* HORARIOS */}
            <div className="dojo4-schedule">

                <div className="schedule-item schedule-item-1">
                    <h3 className="schedule-title schedule-title-1">Niños (5-12 años)</h3>
                    <p className="schedule-days schedule-days-1">Lunes a Viernes</p>
                    <span className="schedule-hours schedule-hours-1">4:00 PM – 5:30 PM</span>
                </div>

                <div className="schedule-item schedule-item-2">
                    <h3 className="schedule-title schedule-title-2">Jóvenes (13-17 años)</h3>
                    <p className="schedule-days schedule-days-2">Lunes a Viernes</p>
                    <span className="schedule-hours schedule-hours-2">5:30 PM – 7:00 PM</span>
                </div>

                <div className="schedule-item schedule-item-3">
                    <h3 className="schedule-title schedule-title-3">Adultos (18+ años)</h3>

                    <p className="schedule-days schedule-days-3">Lunes a Viernes</p>
                    <span className="schedule-hours schedule-hours-3">7:00 PM – 9:00 PM</span>

                    <p className="schedule-days schedule-days-4">Sábados</p>
                    <span className="schedule-hours schedule-hours-4">8:00 AM – 12:00 PM</span>
                </div>

            </div>

        </section>
    );
}
