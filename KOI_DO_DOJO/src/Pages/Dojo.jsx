import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import LayerDojo from '../Components/LayerDojo/LayerDojo';
import LayerDojo1 from '../Components/LayerDojo/LayerDojo1.JSX';
import LayerDojo2 from '../Components/LayerDojo/LayerDojo2.jsx';
import LayerDojoVideo from '../Components/LayerDojo/LayerDojovideo.jsx';
import FilosofiaDojo from '../Components/LayerDojo/FilosofiaDojo.jsx';
import LayerDojo3 from '../Components/LayerDojo/LayerDojo3.jsx';
import LayerDojo4 from '../Components/LayerDojo/LayerDojo4.jsx';
import '/src/Styles/Dojo.css';

function Dojo() {
    return (
        <div>
            <BarraMenu />
            <div className='EspacioCarrusel27'></div>
            <LayerDojo/>
            <LayerDojo1/>
            <LayerDojo4/>
            <LayerDojo3/>
            <LayerDojoVideo/>
            <LayerDojo2/>
            <FilosofiaDojo/>
        </div>
    )
}

export default Dojo