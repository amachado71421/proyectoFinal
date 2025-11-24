import React from "react";
import "/src/Styles/LayerProfile/Layer5.css";

function Layer5() {
    return (
        <div className="Layer5">

            {/* ================== PRIVACIDAD ================== */}
            <section className="PrivacidadSection">
                <h2 className="TituloL5">Tu Privacidad Es Nuestra Prioridad</h2>

                <div className="GridPrivacidad">

                    <div className="CardPrivacidad">
                        <img  src="../src/Images/LayerProfile/shield.png" alt="Protección" className="ImgL5" />
                        <h3 className="TituloCardL5">Protección Total</h3>
                        <p className="TextoCardL5">
                            Tus datos personales están seguros. Solo los usamos para gestión interna.
                        </p>
                    </div>

                    <div className="CardPrivacidad">
                        <img  src="../src/Images/LayerProfile/law.png" alt="Legal" className="ImgL5" />
                        <h3 className="TituloCardL5">Cumplimiento Legal</h3>
                        <p className="TextoCardL5">
                            Seguimos la normativa vigente de protección de datos. Transparencia garantizada.
                        </p>
                    </div>

                    <div className="CardPrivacidad">
                        <img src="../src/Images/LayerProfile/control.png" alt="Control" className="ImgL5" />
                        <h3 className="TituloCardL5">Control Total</h3>
                        <p className="TextoCardL5">
                            Solicita actualización o eliminación de datos. Tú decides sobre tu información.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================== PROCESO DE REGISTRO ================== */}
            <section className="RegistroSection">
                <h2 className="TituloL5">Proceso de Registro Simplificado</h2>

                <div className="GridRegistro">

                    <div className="CardRegistro">
                        <img  src="../src/Images/LayerProfile/Formulario.png" alt="Formulario" className="IconL5" />
                        <h3 className="TituloCardL5">Completa el Formulario</h3>
                        <p className="TextoCardL5">
                            Introduce tus datos personales. Solo toma unos minutos hacerlo.
                        </p>
                    </div>

                    <div className="CardRegistro">
                        <img src="../src/Images/LayerProfile/Email.png" alt="Email" className="IconL5" />
                        <h3 className="TituloCardL5">Confirmación por Email</h3>
                        <p className="TextoCardL5">
                            Recibirás tus datos de acceso. Revisa tu bandeja de entrada.
                        </p>
                    </div>

                    <div className="CardRegistro">
                        <img src="../src/Images/LayerProfile/Contactar.png" alt="Contactar" className="IconL5" />
                        <h3 className="TituloCardL5">Te Contactamos</h3>
                        <p className="TextoCardL5">
                            Nuestro equipo te orienta. Conoce horarios y clases disponibles.
                        </p>
                    </div>

                    <div className="CardRegistro">
                        <img src="../src/Images/LayerProfile/AccederPerfil.png" alt="AccederPerfil" className="IconL5" />
                        <h3 className="TituloCardL5">Accede a Tu Perfil</h3>
                        <p className="TextoCardL5">
                            Gestiona reservas y seguimiento. Todo en un solo lugar.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================== FAQ ================== */}
            <section className="FaqSection">
                <h2 className="TituloL5 faqTitulo">Preguntas Frecuentes</h2>

                <div className="FaqContenedor">

                    <div className="FaqItem">
                        <h4 className="FaqPregunta">¿Olvidaste tu contraseña?</h4>
                        <p className="FaqRespuesta">
                            Usa el enlace de recuperación. Te enviaremos instrucciones por correo electrónico.
                        </p>
                    </div>

                    <div className="FaqItem">
                        <h4 className="FaqPregunta">¿Puedo cambiar mi usuario?</h4>
                        <p className="FaqRespuesta">
                            Sí, desde tu perfil personal. También puedes actualizar tu correo electrónico.
                        </p>
                    </div>

                    <div className="FaqItem">
                        <h4 className="FaqPregunta">¿Qué requisitos necesito?</h4>
                        <p className="FaqRespuesta">
                            Solo ganas de aprender y compromiso. No se requiere experiencia previa.
                        </p>
                    </div>

                    <div className="FaqItem">
                        <h4 className="FaqPregunta">¿Hay clases para todas las edades?</h4>
                        <p className="FaqRespuesta">
                            Tenemos grupos para niños y adultos. Cada nivel tiene su propio horario.
                        </p>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default Layer5;
