import React, { useState, useEffect } from 'react'
import '/src/Styles/Palmares.css'

const Palmares = () => {
    const [stats, setStats] = useState({
        victorias: 0,
        derrotas: 0,
        empates: 0
    })
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const RESULTADOS = {
        VICTORIA: 1,
        EMPATE: 2,
        DERROTA: 3,
    }

    useEffect(() => {
        cargarPalmares()
    }, [])

    const cargarPalmares = async () => {
        try {
            setCargando(true)
            setError(null)

            // Obtener usuario actual
            const resMe = await fetch('http://localhost:8000/api/auth/me/', {
                credentials: 'include'
            })

            if (!resMe.ok) {
                throw new Error('No hay usuario autenticado')
            }

            const datosUsuario = await resMe.json()
            const idPerfil = datosUsuario.id_perfil

            // Obtener palmares del usuario
            const resPalmares = await fetch('http://localhost:8000/api/palmares/', {
                credentials: 'include'
            })

            if (!resPalmares.ok) {
                throw new Error('Error al cargar palmares')
            }

            const datosPalmares = await resPalmares.json()
            const palmaresUsuario = datosPalmares.results || datosPalmares

            // Procesar palmares
            const estadisticas = {
                victorias: 0,
                derrotas: 0,
                empates: 0
            }

            palmaresUsuario.forEach((palmar) => {
                if (palmar.id_perfil === idPerfil) {
                    if (palmar.id_resultado === RESULTADOS.VICTORIA) {
                        estadisticas.victorias += 1
                    } else if (palmar.id_resultado === RESULTADOS.EMPATE) {
                        estadisticas.empates += 1
                    } else if (palmar.id_resultado === RESULTADOS.DERROTA) {
                        estadisticas.derrotas += 1
                    }
                }
            })

            setStats(estadisticas)
        } catch (err) {
            setError(err.message)
            console.error('Error al cargar palmares:', err)
        } finally {
            setCargando(false)
        }
    }

    if (cargando) {
        return (
            <div className="palmares-card">
                <h2>Palmarés</h2>
                <div className="cargando">Cargando datos...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="palmares-card">
                <h2>Palmarés</h2>
                <div className="error">{error}</div>
            </div>
        )
    }

    const total = stats.victorias + stats.derrotas + stats.empates

    return (
        <div className="palmares-card">
            <h2>Palmarés</h2>
            <div className="stats">
                <div className="stat-item victoria">
                    <span className="label">Victorias</span>
                    <span className="value">{stats.victorias}</span>
                </div>
                <div className="stat-item derrota">
                    <span className="label">Derrotas</span>
                    <span className="value">{stats.derrotas}</span>
                </div>
                <div className="stat-item empate">
                    <span className="label">Empates</span>
                    <span className="value">{stats.empates}</span>
                </div>
            </div>
            <div className="total-encuentros">
                Total de encuentros: <strong>{total}</strong>
            </div>
        </div>
    )
}

export default Palmares