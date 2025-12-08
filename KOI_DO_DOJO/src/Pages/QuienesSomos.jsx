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
<<<<<<< HEAD
import LayerGrados from '../Components/QuienesSomos/LayerGrados.jsx'
=======
import AdministradorPalmares from '../Components/Perfil/AdministradorPalmares.jsx'
import AdministrarResultados from '../Components/Perfil/AdministrarResultados.jsx'
>>>>>>> 56a0266fb24a5412af8e543c54b35c270f79ce86

function QuienesSomos() {
    return (
        <div>
            <BarraMenu />
            <Sensei/>
            <Danilo/>
            <LayerGrados/>
            

            <main style={{ padding: '1rem' }}>
                <section style={{ marginBottom: '2rem' }}>
                    <h2>Quiénes Somos</h2>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h3>Gestión de Roles</h3>
                    <CrearRoles />
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h3>Promover Usuarios</h3>
                    <PromoverUsuarios />
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h3>Asignar rol</h3>
                    <AsignarRol/>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h3>Crear Etiquetas</h3>
                    <CrearEtiquetas/>
                </section>
                

                <section style={{ marginTop: '2rem' }}>
                    <h3>Crear Logros</h3>
                    <CrearLogros/>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h3>Asignar Logros</h3>
                    <AsignarLogro/>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h3>Asignar Logros</h3>
<<<<<<< HEAD
                </section>
=======
                    <AdministrarResultados/>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h3>Asignar Logros</h3>
                    <AdministradorPalmares/>
                </section>



>>>>>>> 56a0266fb24a5412af8e543c54b35c270f79ce86
            </main>
        </div>
    )
}

export default QuienesSomos