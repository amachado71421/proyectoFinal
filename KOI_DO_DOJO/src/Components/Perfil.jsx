// src/Components/UserProfile.jsx
import React, { useState, useEffect } from 'react'

const Perfil = () => {
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
                <img src="https://via.placeholder.com/150" alt="Foto de perfil" />
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
        </div>
    )
}

export default Perfil
