import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import '/src/Styles/Pruebas.css';
import LoginRegisterComp from '../Components/LoginRegisterComp';


function Perfil() {
    return (
        <div>
            <BarraMenu />
            <div className='divPerfil'>
            <LoginRegisterComp/>
            </div>

        </div>
    )
}

export default Perfil