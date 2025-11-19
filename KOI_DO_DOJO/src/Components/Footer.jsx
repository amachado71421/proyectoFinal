import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "../Styles/Footer.css";

const Footer = () => {
    return (
        <footer className="Footer">
            {/* Franja roja superior */}
            <div className="FranjaRoja" />

            <div className="FooterContenido">

                {/* ===== ENCABEZADO NUEVO (IMAGEN - TEXTO - IMAGEN) ===== */}
                <div className="FooterHeaderWrapper">

                    {/* Imagen izquierda */}
                    <img
                        className="FooterHeaderImg1"
                        src="../src/Images/LogoEnNegativo.png"
                        alt="Logo Izquierdo"
                    />

                    {/* Texto Central */}
                    <div className="FooterCabecera">
                        <h2 className="FooterTitulo">CONTACTO</h2>
                        <p className="FooterDojo">KOI-DO DOJO</p>
                        <p className="FooterLider">
                            <strong>Líder del dojo:</strong> Danilo Vega
                        </p>
                    </div>

                    {/* Imagen derecha */}
                    <img
                        className="FooterHeaderImg"
                        src="../src/Images/LOGOKyokushin.png"
                        alt="Logo Derecho"
                    />

                </div>

                {/* ===== BLOQUE DE INFORMACIÓN ===== */}
                <div className="FooterInfo">
                    <p className="FooterTexto">
                        <strong>Dirección:</strong> Contiguo al Condominio La Constancia,
                        Boulevard San Antonio, del Cementerio 100 oeste y 25 norte,
                        local 1 y 2, San José Province, San Antonio, 10305
                    </p>

                    <p className="FooterTexto">
                        <strong>Teléfono:</strong>{" "}
                        <a href="tel:+50685439138">+506 8543 9138</a>
                    </p>

                    <p className="FooterTexto">
                        <strong>Correo:</strong>{" "}
                        <a href="mailto:koido.dojo2020@gmail.com">koido.dojo2020@gmail.com</a>
                    </p>

                    <p className="FooterTexto">
                        <strong>Fundado:</strong> 06/02/2023
                    </p>
                </div>

                {/* ===== ICONOS DE REDES ===== */}
                <div className="FooterRedes">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <FaFacebookF />
                    </a>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                    >
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
