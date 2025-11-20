// src/Components/Logros.jsx
import React, { useState, useEffect } from 'react'
import '/src/Styles/Logros.css'

const Logros = () => {
    const [logros, setLogros] = useState([
        { id: 1, nombre: 'Campeón Nacional', comentario: 'Gran desempeño en la final' },
        { id: 2, nombre: 'Participación Internacional', comentario: 'Primera experiencia fuera del país' },
        { id: 3, nombre: 'Reconocimiento Académico', comentario: '' } // sin comentario
    ])

    useEffect(() => {
        // Aquí iría la llamada al API en el futuro:
        // fetch('/api/logros').then(res => res.json()).then(data => setLogros(data))
    }, [])

    return (
        <div className="logros-card">
            <h2>Logros</h2>
            <ul>
                {logros.map(item => (
                    <li key={item.id}>
                        <p><strong>{item.nombre}</strong></p>
                        {item.comentario && <span className="comentario">{item.comentario}</span>}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Logros
