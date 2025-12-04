// src/components/Layerdojo3.jsx
import "/src/Styles/LayerDojo/LayerDojo3.css";

export default function LayerDojo3() {
    return (
        <section className="dojo3-section">
            <div className="dojo3-container">

                {/* TÍTULO */}
                <h1 className="dojo3-title">Instalaciones y Servicios del Dojo</h1>

                {/* DESCRIPCIÓN */}
                <p className="dojo3-description">
                    Nuestras instalaciones han sido diseñadas meticulosamente siguiendo estándares
                    internacionales de dojos tradicionales japoneses, combinando funcionalidad moderna
                    con la estética y filosofía ancestral. Cada espacio está pensado para maximizar tu
                    experiencia de entrenamiento y crecimiento personal.
                </p>

                {/* GALERÍA DE IMÁGENES */}
                <div className="dojo3-gallery">
                    <img src="../src/Images/LayerDojo/dojo1.png" alt="Sala principal" />
                    <img src="../src/Images/LayerDojo/dojo2.png"  alt="Áreas especializadas" />
                    <img src="../src/Images/LayerDojo/dojo3.png"  alt="Servicios complementarios" />
                    <img src="../src/Images/LayerDojo/dojo4.png"  alt="Servicios Meditación" />
                </div>

                {/* BLOQUES DE INFORMACIÓN */}
                <div className="dojo3-info-grid">

                    <div className="dojo3-info-item">
                        <span className="dojo3-number">01</span>
                        <h3 className="dojo3-info-title">Sala Principal de Entrenamiento</h3>
                        <p className="dojo3-info-text">
                            Amplio espacio con tatamis profesionales y esteras de alta calidad importadas
                            directamente de Japón, garantizando máxima seguridad, amortiguación perfecta
                            y la comodidad necesaria para entrenamientos intensivos y técnicas avanzadas
                            de suelo.
                        </p>
                    </div>

                    <div className="dojo3-info-item">
                        <span className="dojo3-number">02</span>
                        <h3 className="dojo3-info-title">Áreas Especializadas</h3>
                        <p className="dojo3-info-text">
                            Zonas claramente diferenciadas y señalizadas para calentamiento dinámico,
                            práctica técnica de katas y kumite, meditación zazen, y trabajo con equipos
                            especializados como makiwaras y sacos de entrenamiento.
                        </p>
                    </div>

                    <div className="dojo3-info-item">
                        <span className="dojo3-number">03</span>
                        <h3 className="dojo3-info-title">Servicios Complementarios</h3>
                        <p className="dojo3-info-text">
                            Vestuarios amplios y limpios con duchas de agua caliente, zona de descanso
                            con biblioteca marcial, casilleros personales de seguridad, y tienda oficial
                            con equipo certificado en nuestros colores corporativos.
                        </p>
                    </div>

                </div>

                {/* NOTA FINAL */}
                <div className="dojo3-note">
                    <span className="note-icon">⚪</span>
                    <p>
                        <strong>Ambiente Controlado:</strong> Contamos con aire acondicionado, ventilación
                        optimizada y sistema de purificación de aire para mantener condiciones ideales de
                        entrenamiento durante todo el año.
                    </p>
                </div>

            </div>
        </section>
    );
}
