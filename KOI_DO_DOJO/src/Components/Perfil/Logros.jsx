import React, { useState, useEffect } from 'react'
import '/src/Styles/Logros.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const ME_ENDPOINT = `${API_URL}/api/auth/me/`
const PERFIL_LOGROS_ENDPOINT = `${API_URL}/api/perfil-logros/`
const LOGROS_ENDPOINT = `${API_URL}/api/logros/`

const Logros = () => {
    const [logros, setLogros] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Leer cookie CSRF
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'))
        return match ? decodeURIComponent(match[2]) : null
    }

    // Headers con CSRF token
    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        const csrf = getCookie('csrftoken')
        if (csrf) headers['X-CSRFToken'] = csrf
        return headers
    }

    useEffect(() => {
        const fetchUserLogros = async () => {
            setLoading(true)
            setError('')

            try {
                // 1. Obtener datos del usuario autenticado
                const meRes = await fetch(ME_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!meRes.ok) {
                    if (meRes.status === 401) {
                        setError('No estás autenticado. Inicia sesión.')
                    } else {
                        setError('Error al obtener datos del usuario.')
                    }
                    setLoading(false)
                    return
                }

                const userData = await meRes.json()
                const userId = userData.id_perfil || userData.id

                // 2. Obtener logros asignados al usuario
                const perfil_logrosRes = await fetch(PERFIL_LOGROS_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!perfil_logrosRes.ok) {
                    throw new Error(`Error cargando asignaciones: HTTP ${perfil_logrosRes.status}`)
                }

                const perfil_logrosData = await perfil_logrosRes.json()
                const allPerfilLogros = Array.isArray(perfil_logrosData) ? perfil_logrosData : perfil_logrosData.results || []

                // Filtrar solo los logros del usuario actual
                const userPerfilLogros = allPerfilLogros.filter(pl => pl.id_perfil === userId)

                if (userPerfilLogros.length === 0) {
                    setLogros([])
                    setLoading(false)
                    return
                }

                // 3. Obtener detalles de los logros
                const logrosRes = await fetch(LOGROS_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!logrosRes.ok) {
                    throw new Error(`Error cargando logros: HTTP ${logrosRes.status}`)
                }

                const logrosData = await logrosRes.json()
                const allLogros = Array.isArray(logrosData) ? logrosData : logrosData.results || []

                // 4. Combinar información: logros asignados con detalles de logros
                const logrosCombinados = userPerfilLogros.map(pl => {
                    const logroDetail = allLogros.find(l => l.id_logro === pl.id_logro || l.id === pl.id_logro)
                    return {
                        id: pl.id_logro,
                        nombre: logroDetail?.nombre_logro || `Logro ${pl.id_logro}`,
                        descripcion: logroDetail?.descripcion_logro || '',
                        comentario: pl.comentarios_logro || '',
                        fecha_asignacion: pl.fecha_asignacion
                    }
                })

                setLogros(logrosCombinados)
            } catch (err) {
                console.error('Error al cargar logros:', err)
                setError('Error al cargar tus logros.')
            } finally {
                setLoading(false)
            }
        }

        fetchUserLogros()
    }, [])

    if (loading) {
        return (
            <div className="logros-card">
                <h2>Logros</h2>
                <div style={{ color: '#666' }}>Cargando logros...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="logros-card">
                <h2>Logros</h2>
                <div style={{ color: 'red', fontSize: 14 }}>{error}</div>
            </div>
        )
    }

    return (
        <div className="logros-card">
            <h2>Logros</h2>
            {logros.length === 0 ? (
                <div style={{ color: '#999', fontSize: 14 }}>No tienes logros asignados aún.</div>
            ) : (
                <ul>
                    {logros.map(item => (
                        <li key={item.id}>
                            <div className="logro-item-header">
                                <p><strong>{item.nombre}</strong></p>
                                <small className="logro-fecha">
                                    {new Date(item.fecha_asignacion).toLocaleDateString('es-ES')}
                                </small>
                            </div>
                            {item.descripcion && (
                                <p className="logro-descripcion">{item.descripcion}</p>
                            )}
                            {item.comentario && (
                                <span className="comentario">{item.comentario}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default Logros
