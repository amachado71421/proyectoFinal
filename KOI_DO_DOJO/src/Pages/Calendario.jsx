import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Calendar from '../Components/Calendario/Calendar'
import CrearEtiquetas from '../Components/Calendario/Administrador/CrearEtiquetas'
import CrearRangoEdad from '../Components/Calendario/Administrador/CrearRangoEdad'
import CrearLogros from '../Components/Calendario/Administrador/CrearLogros'
import CrearEstadosPerfil from '../Components/Calendario/Administrador/CrearEstadosPerfil'
import '/src/Styles/Pruebas.css';


function Calendario() {
    return (
        <div>
            <BarraMenu />
            <div className='divPerfil'>
                <CrearRangoEdad />
                <CrearEstadosPerfil />
                <CrearLogros />
                <CrearEtiquetas />
                <Calendar />
            </div>
        </div>
    )
}

export default Calendario
