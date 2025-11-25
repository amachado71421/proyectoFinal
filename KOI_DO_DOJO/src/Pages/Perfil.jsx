import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import '/src/Styles/Perfil.css';
import UserProfile from '../Components/Perfil/UserProfile';
import '/src/Styles/Pruebas.css'


function Perfil() {
    return (
        <div>
            <BarraMenu />
            <div className='divPerfil'>
                <UserProfile />
            </div>
        </div>
    )
}

export default Perfil