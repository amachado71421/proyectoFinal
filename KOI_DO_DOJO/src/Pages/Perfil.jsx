import React from 'react';
import BarraMenu from '../Components/BarraMenu';
import '/src/Styles/Perfil.css';

// Importamos el perfil del usuario
import UserProfile from '../Components/Perfil/UserProfile';

// Importamos las capas del perfil
import Layer1 from '../Components/LayerProfile/Layer1';
import Layer2 from '../Components/LayerProfile/Layer2';
import Layer3 from '../Components/LayerProfile/Layer3';
import Layer4 from '../Components/LayerProfile/Layer4';
import Layer5 from '../Components/LayerProfile/Layer5';

function Perfil() {
    return (
        <div>
            <BarraMenu />
            <div className="divPerfil">
                <UserProfile />
            </div>
        </div>
    );
}

export default Perfil;
