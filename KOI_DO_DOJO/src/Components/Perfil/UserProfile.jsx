// src/Components/Perfil/UserProfile.jsx
import React, { useState, useEffect } from 'react'
import '/src/Styles/UserProfile.css'

// Importamos los componentes
import Palmares from './Palmares'
import Logros from './Logros'

const UserProfile = () => {
    // Estado inicial estático (simulando datos de API)
    const [userData, setUserData] = useState({
        nombre: 'Juan',
        apellido: 'Pérez',
        usuario: 'juanperez',
        correo: 'juan.perez@example.com',
        rol: 'Estudiante',
        peso: 70,   // kg
        altura: 175 // cm
    })

    // Simulación de carga desde API (base para futuro)
    useEffect(() => {
        // Aquí iría la llamada al API, por ejemplo:
        // fetch('/api/user').then(res => res.json()).then(data => setUserData(data))
    }, [])

    // Handlers para modificar peso y altura
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="user-card">
            <div className="user-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWZ1thmT--iqRTOaH45gaSxGzTQf6fIQXyg&s" alt="Foto de perfil" />
            </div>
            <div className="user-info">
                <h2>{userData.nombre} {userData.apellido}</h2>
                <p><strong>Usuario:</strong> {userData.usuario}</p>
                <p><strong>Correo:</strong> {userData.correo}</p>
                <p><strong>Rol:</strong> {userData.rol}</p>
            </div>

            <div className="user-extra">
                <label>
                    Peso (kg):
                    <input
                        type="number"
                        name="peso"
                        value={userData.peso}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Altura (cm):
                    <input
                        type="number"
                        name="altura"
                        value={userData.altura}
                        onChange={handleChange}
                    />
                </label>
            </div>

            {/* Contenedor para logros y palmarés */}
            <div className="user-stats">
                <div className="user-logros">
                    <Logros/>
                </div>
                <div className="user-palmares">
                    <Palmares />
                </div>
            </div>
        </div>
    )
}

export default UserProfile
