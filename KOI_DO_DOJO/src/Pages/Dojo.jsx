import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import LayerDojo from '../Components/LayerDojo/LayerDojo';
import LayerDojo1 from '../Components/LayerDojo/LayerDojo1.JSX';
import LayerDojo2 from '../Components/LayerDojo/LayerDojo2.jsx';
import LayerDojoVideo from '../Components/LayerDojo/LayerDojovideo.jsx';
import '/src/Styles/Dojo.css';

function Dojo() {
    return (
        <div>
            <BarraMenu />
            <div className='EspacioCarrusel'></div>
            <LayerDojo/>
            <LayerDojo1/>
            <LayerDojoVideo/>
            <LayerDojo2/>
        </div>
    )
}

export default Dojo