import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import '/src/Styles/Perfil.css';
import LoginRegisterComp from '../Components/LoginRegisterComp';
import Layer1 from '../Components/LayerProfile/Layer1';
import Layer2 from '../Components/LayerProfile/Layer2';
import Layer3 from '../Components/LayerProfile/Layer3';
import Layer4 from '../Components/LayerProfile/Layer4';
import Layer5 from '../Components/LayerProfile/Layer5';


function Perfil() {
    return (
        <div>
            <BarraMenu />
            <div className='EspacioBajar'>
            <Layer1/>
            </div>
            <Layer2/>
            <Layer3/>
            <Layer4/>
            <Layer5/>

        </div>
    )
}

export default Perfil