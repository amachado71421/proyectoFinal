import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import GestionEventos from '../Components/Calendario/GestionEventos'
import '/src/Styles/Pruebas.css'

function GestionEventosPage() {
    return (
        <div>
            <BarraMenu />
            <div className='divPerfil'>
                <GestionEventos />
            </div>
        </div>
    )
}

export default GestionEventosPage
