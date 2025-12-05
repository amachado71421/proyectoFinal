import React, { useEffect, useRef, useState } from 'react';
import '/src/Styles/LayerDojo/LayerDojo1.css';

function LayerDojo1() {

    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(sectionRef.current);
    }, []);

    return (
        <div ref={sectionRef} className={`MapaDojoSection ${visible ? "visible" : ""}`}>

            {/* MAPA - IZQUIERDA */}
            <div className="BoxItem fade-slide">
                <iframe
                    title="Mapa Dojo"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "15px" }}
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491.30228018760886!2d-84.05449462084826!3d9.899080801892866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e32a044d4683%3A0x26800bb1c5733e94!2sKyokushin%20Kenbukai%20-%20Koi-Do%20Dojo%20Desamparados!5e0!3m2!1ses-419!2scr!4v1764698527002!5m2!1ses-419!2scr"
                ></iframe>
            </div>

            {/* TEXTO - DERECHA */}
            <div className="BoxItem fade-slide">
                <h2 className="MapaTitulo">📍 Nuestra Ubicación</h2>
                <h1 className="MapaSubtitulo">Koi-Do Dojo Desamparados</h1>

                <p className="MapaDescripcion">
                    Entrena en un ambiente diseñado para el crecimiento físico,
                    mental y espiritual. Nuestra ubicación es accesible y segura
                    para practicantes de todas las edades.
                </p>

                <div className="InfoDetalle">
                    <p><span className="Icono">📌</span> Contiguo al Condominio La Constancia</p>
                    <p><span className="Icono">📍</span> Boulevard San Antonio</p>
                    <p><span className="Icono">🧭</span> Del Cementerio 100 oeste y 25 norte</p>
                    <p><span className="Icono">🏢</span> Locales 1 y 2</p>
                    <p><span className="Icono">🌎</span> San José — San Antonio, 10305</p>
                </div>
            </div>

        </div>
    );
}

export default LayerDojo1;
