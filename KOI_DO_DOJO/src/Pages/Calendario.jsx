import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Calendar from '../Components/Calendario/Calendar'
import CrearEtiquetas from '../Components/Administrador/CrearEtiquetas'
import CrearRangoEdad from '../Components/Administrador/CrearRangoEdad'
import CrearLogros from '../Components/Administrador/CrearLogros'
import CrearEstadosPerfil from '../Components/Administrador/CrearEstadosPerfil'


function Calendario() {
    return (
        <div>
            <BarraMenu/>
            <CrearRangoEdad/>
            <CrearEstadosPerfil/>
            <CrearLogros/>
            <CrearEtiquetas/>
            <Calendar/>
        </div>
    )
}

export default Calendario
