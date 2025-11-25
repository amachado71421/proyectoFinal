import React from 'react'
import '/src/Styles/LayerProfile/Layer3.css';

function Layer3() {
    return (
        <div className='ContenedorLayer3'>
            <div className='ImgLayer3'>
                <img src="../src/Images/LayerProfile/Layer3Img.png" alt="" />
            </div>
            <div className='ContenedorTextoLayer3'>
                <div className='TituloLayer3'>
                    <h1 className='TituloBeneficos'>Beneficios de Ser Parte del Dojo</h1>
                </div>

                <div className='ContenedorBeneficios2'>
                    <div className='Tradición'>
                        <h2 className='TituloBeneficio'>Tradición Milenaria</h2>
                        <img className='IconosBeneficios' src="../src/Images/LayerProfile/ImgTradicion.png" alt="" />
                        <p className='ParrafoBeneficio'>Forma parte de una disciplina que combina respeto y superación personal constante.</p>
                    </div>

                    <div className='Exclusivo'>
                        <h2 className='TituloBeneficio'>Contenido Exclusivo</h2>
                        <img className='IconosBeneficios' src="../src/Images/LayerProfile/ImgExclusivo.png" alt="" />
                        <p className='ParrafoBeneficio'>Accede a eventos especiales y evaluaciones personalizadas de tu progreso.</p>
                    </div>
                </div>

                <div className='PromocionesEspeciales1'>
                    <h2 className='TituloBeneficio'>Promociones Especiales</h2>
                    <img className='IconosBeneficios' src="../src/Images/LayerProfile/ImgPromos.png" alt="" />
                    <p className='ParrafoBeneficio'>Recibe noticias y ofertas exclusivas reservadas para alumnos registrados.</p>
                </div>
            </div>
        </div>
    )
}

export default Layer3