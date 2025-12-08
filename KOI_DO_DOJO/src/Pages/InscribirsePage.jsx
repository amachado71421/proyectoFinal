import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import InscribirseEvento from '../Components/Calendario/Usuario/InscribirseEvento'
import '/src/Styles/Pruebas.css'

function InscribirsePage() {
    return (
        <div>
            <BarraMenu />
            <div className='divPerfil'>
                <InscribirseEvento />
            </div>
        </div>
    )
}

export default InscribirsePage
