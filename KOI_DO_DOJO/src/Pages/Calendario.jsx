import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Calendar from '../Components/Calendario/Calendar'
import CrearEtiquetas from '../Components/Calendario/Administrador/CrearEtiquetas'
import CrearRangoEdad from '../Components/Calendario/Administrador/CrearRangoEdad'


function Calendario() {
    return (
        <div>
            <BarraMenu/>
            <CrearEtiquetas/>
            <CrearRangoEdad/>
            <Calendar/>
        </div>
    )
}

export default Calendario
