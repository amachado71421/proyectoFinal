import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Testimonio from '../Components/Testimonio'
import Footer from '../Components/Footer';
import "../Styles/Contactenos.css";


function Contactenos() {
    return (
        <div className='TestimonioBloc'>
            <BarraMenu />

            <h1 className="TituloTestimonio">TESTIMONIOS DE NUESTROS ESTUDIANTES</h1>
            <h2 className="SubtituloTestimonio">Experiencias reales de los estudiantes del KOI-DO DOJO.</h2>

            <div>
                <Testimonio />
            </div>
            <Footer/>

        </div>
    )
}

export default Contactenos