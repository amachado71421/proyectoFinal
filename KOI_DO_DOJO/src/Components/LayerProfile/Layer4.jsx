import React from "react";
import '/src/Styles/LayerProfile/Layer4.css';

function Layer4() {
    return (
        <div className="ContenedorLayer4">

            <h2 className="TituloLayer4">Valores y Compromiso del Dojo</h2>

            <div className="GridFortalezas">

                <div className="FortalezaCard">
                    <img className="IconoValores" src="../src/Images/LayerProfile/ImgRespeto.png" alt="ImgRespeto" />
                    <h3 className="TituloFortaleza">Respeto</h3>
                    <p className="TextoFortaleza">
                        Honramos la tradición del Karate-Do. Respetamos a maestros y compañeros por igual.
                    </p>
                </div>

                <div className="FortalezaCard">
                    <img className="IconoValores" src="../src/Images/LayerProfile/ImgDisciplina.png" alt="ImgDisciplina" />
                    <h3 className="TituloFortaleza">Disciplina</h3>
                    <p className="TextoFortaleza">
                        Cada alumno mantiene el dojo limpio. La disciplina comienza con pequeñas acciones.
                    </p>
                </div>

                <div className="FortalezaCard">
                    <img className="IconoValores" src="../src/Images/LayerProfile/ImgPerseverancia.png" alt="ImgPerseverancia" />
                    <h3 className="TituloFortaleza">Perseverancia</h3>
                    <p className="TextoFortaleza">
                        El camino del karate requiere dedicación. Superamos obstáculos juntos como familia.
                    </p>
                </div>

                <div className="FortalezaCard">
                    <img className="IconoValores" src="../src/Images/LayerProfile/ImgCompromiso.png" alt="ImgCompromiso" />
                    <h3 className="TituloFortaleza">Compromiso</h3>
                    <p className="TextoFortaleza">
                        Al registrarte, aceptas nuestras normas. Tu compromiso nos fortalece a todos.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Layer4;
