import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import '/src/Styles/Perfil.css';
import LoginRegisterComp from '../Components/LoginRegisterComp';
import Layer1 from '../Components/LayerProfile/Layer1';
import Layer2 from '../Components/LayerProfile/Layer2';


function Perfil() {
    return (
        <div>
            <BarraMenu />
            <div className='EspacioBajar'>
            <Layer1/>
            </div>
            <Layer2/>

        </div>
    )
}

export default Perfil