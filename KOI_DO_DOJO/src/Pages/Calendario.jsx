import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Calendar from '../Components/Calendario/Calendar'
import CrearEtiquetas from '../Components/Calendario/Administrador/CrearEtiquetas'


function Calendario() {
    return (
        <div>
            <BarraMenu/>
            <CrearEtiquetas/>
            <Calendar/>
        </div>
    )
}

export default Calendario
