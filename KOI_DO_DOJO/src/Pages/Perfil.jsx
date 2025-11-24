import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import '/src/Styles/Perfil.css';
import UserProfile from '../Components/Perfil/UserProfile';

function Perfil() {
    return (
        <div>
            <BarraMenu/>
            <UserProfile/>
        </div>
    )
}

export default Perfil