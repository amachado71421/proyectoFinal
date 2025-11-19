import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import ListaEventos from '../Components/Calendario/ListaEventos'
import '/src/Styles/Pruebas.css';

function Eventos() {
    return (
        <div>
            <BarraMenu />
            <div className='divPerfil'>
                <ListaEventos />
            </div>
        </div>
    )
}

export default Eventos