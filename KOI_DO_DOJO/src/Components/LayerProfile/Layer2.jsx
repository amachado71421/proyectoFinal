import React from 'react'
import LoginRegisterComp from '../LoginRegisterComp';

import '/src/Styles/LayerProfile/Layer2.css';

function Layer2() {
    return (
        <div className='Layer2'>

            {/* TÍTULO GENERAL */}
            <div className='SegmentoTituloLayer2'>
                <h1 className='TituloLayer2'>Accede a Tu Entrenamiento Personal</h1>
            </div>

            <div className='Layer2Contenido'>

                {/* ================================
                    COLUMNA IZQUIERDA
                ================================= */}
                <div className='Segmento1InSesion'>
                    <div className='ContenedorInSesion'>

                        <h2 className='TituloIniciarSesion'>Iniciar Sesión o Registrate</h2>

                        <p className='ParrafoInsesion'>
                            Accede para reservar clases y consultar horarios.
                            Sigue tu progreso en tiempo real.
                            ¿Nuevo aquí? Únete a nuestra comunidad marcial.
                        </p>

                        <hr className='LineaHorizontal' />

                        {/* =======================================
                            🔥 Aquí agregué LoginRegisterComp
                        ======================================== */}
                        <div className='LoginRegisterWrapper'>

                            <LoginRegisterComp />
                        </div>

                

                    </div>
                </div>

                {/* ================================
                    COLUMNA DERECHA
                ================================= */}
                <div className='ContenedorImgSesion'>
                    <div className='ImgSegmento1'>
                        <img src="../src/Images/LayerProfile/Layer2Img.png" alt="Layer2Img" />
                    </div>

                    <div className='ImgSegmento2'>
                        <p className='ParrafoPieImg'>
                            Accede a contenido exclusivo, horarios actualizados y tu historial de entrenamientos.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Layer2;
