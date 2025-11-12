import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Calendar from '../Components/Calendario/Calendar'
import CrearEtiquetas from '../Components/Administrador/CrearEtiquetas'
import CrearRangoEdad from '../Components/Administrador/CrearRangoEdad'
import CrearLogros from '../Components/Administrador/CrearLogros'


function Calendario() {
    return (
        <div>
            <BarraMenu/>
            <CrearRangoEdad/>
            <CrearLogros/>
            <CrearEtiquetas/>
            <Calendar/>
        </div>
    )
}

export default Calendario
