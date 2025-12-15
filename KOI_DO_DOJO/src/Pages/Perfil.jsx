import React from 'react';
import BarraMenu from '../Components/BarraMenu';
import '/src/Styles/Perfil.css';

// Importamos el perfil del usuario
import UserProfile from '../Components/Perfil/UserProfile';

import Palmares from '../Components/Perfil/Palmares';
import Logros from '../Components/Perfil/Logros';


function Perfil() {
    return (
        <div className="perfil-container">
            <BarraMenu />

            <div className="perfil-left">
                <div className="perfil-user">
                    <UserProfile />
                </div>
            </div>

            <div className="perfil-right">
                <div className="user-palmares">
                    <Palmares />
                </div>

                <div className="user-logros">
                    <Logros />
                </div>
            </div>

        </div>
    );
}

export default Perfil;

