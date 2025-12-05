import React from 'react'
import BarraMenu from '../Components/BarraMenu'
import CrearRoles from '../Components/Perfil/CrearRoles.jsx'
import PromoverUsuarios from '../Components/Perfil/PromoverUsuarios.jsx'
import AsignarRol from '../Components/Perfil/AsignarRol.jsx'
import CrearEtiquetas from '../Components/Calendario/Administrador/CrearEtiquetas.jsx'
import CrearLogros from '../Components/Perfil/CrearLogros.jsx'
import AsignarLogro from '../Components/Perfil/AsignarLogro.jsx'

function QuienesSomos() {
    return (
        <div>
            <BarraMenu />

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



            </main>
        </div>
    )
}

export default QuienesSomos