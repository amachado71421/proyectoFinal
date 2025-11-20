// src\Components\Perfil\Palmares.jsx
import React, { useState, useEffect } from 'react'
import '/src/Styles/Palmares.css'

const Palmares = () => {
    const [stats, setStats] = useState({
        victorias: 12,
        derrotas: 3,
        empates: 2
    })

    useEffect(() => {
        // Aquí iría la llamada al API en el futuro:
        // fetch('/api/palmares').then(res => res.json()).then(data => setStats(data))
    }, [])

    return (
        <div className="palmares-card">
            <h2>Palmarés</h2>
            <div className="stats">
                <div className="stat-item">
                    <span className="label">Victorias</span>
                    <span className="value">{stats.victorias}</span>
                </div>
                <div className="stat-item">
                    <span className="label">Derrotas</span>
                    <span className="value">{stats.derrotas}</span>
                </div>
                <div className="stat-item">
                    <span className="label">Empates</span>
                    <span className="value">{stats.empates}</span>
                </div>
            </div>
        </div>
    )
}

export default Palmares
