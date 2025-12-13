import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import Sensei from '../Components/QuienesSomos/Sensei.jsx'
import Danilo from '../Components/QuienesSomos/Danilo.jsx'

import CrearRoles from '../Components/Perfil/CrearRoles.jsx'
import PromoverUsuarios from '../Components/Perfil/PromoverUsuarios.jsx'
import AsignarRol from '../Components/Perfil/AsignarRol.jsx'
import CrearEtiquetas from '../Components/Calendario/Administrador/CrearEtiquetas.jsx'
import CrearLogros from '../Components/Perfil/CrearLogros.jsx'
import AsignarLogro from '../Components/Perfil/AsignarLogro.jsx'
import LayerGrados from '../Components/QuienesSomos/LayerGrados.jsx'
import AdministradorPalmares from '../Components/Perfil/AdministradorPalmares.jsx'
import AdministrarResultados from '../Components/Perfil/AdministrarResultados.jsx'

function QuienesSomos() {
    return (
        <div>
            <BarraMenu />
            <Sensei/>
            <Danilo/>
            <LayerGrados/>
        </div>
    )
}

export default QuienesSomos
