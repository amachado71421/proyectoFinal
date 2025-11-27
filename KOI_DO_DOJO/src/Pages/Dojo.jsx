import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import LayerDojo1 from '../Components/LayerDojo/LayerDojo1.JSX'
import '/src/Styles/Dojo.css';

function Dojo() {
    return (
        <div>
            <BarraMenu />
            <div className='EspacioCarrusel'></div>
            <LayerDojo1/>
        </div>
    )
}

export default Dojo