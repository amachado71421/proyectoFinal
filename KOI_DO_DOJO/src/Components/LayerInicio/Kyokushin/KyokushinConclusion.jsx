import React from "react";
import "/src/Styles/Kyokushin/KyokushinConclusion.css";

export default function KyokushinConclusion() {
    return (
        <section className="victoria-section">

            <div className="victoria-container">

                <h2 className="victoria-title"> En Conclusión: La Verdadera Victoria</h2>

                {/* Contenedor de las dos tarjetas */}
                <div className="victoria-cards">

                    <div className="victoria-card">
                        <h3>Más allá de la Lucha</h3>
                        <p>
                            El Kyokushin no es simplemente una disciplina de combate; es una profunda búsqueda 
                            de la verdad interior. Cada golpe, cada defensa, es un paso hacia el autoconocimiento 
                            y la comprensión de nuestras propias capacidades y limitaciones.
                        </p>
                    </div>

                    <div className="victoria-card">
                        <h3>Dominio del Espíritu</h3>
                        <p>
                            A través del sudor, el respeto mutuo y la constancia inquebrantable, cada practicante 
                            experimenta una transformación integral. La verdadera victoria reside en el dominio de 
                            uno mismo, la forja de un espíritu indomable frente a cualquier adversidad.
                        </p>
                    </div>

                </div>

                {/* Texto final */}
                <p className="victoria-final">
                    Estas filosofías, presentes en todas las artes marciales, nos enseñan que el camino del guerrero 
                    es, en esencia, un camino de vida.
                </p>

            </div>

        </section>
    );
}
