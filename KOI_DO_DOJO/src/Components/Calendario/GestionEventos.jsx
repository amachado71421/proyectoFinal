import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import AddEventForm from './AddEventForm'
import VerInscripciones from './VerInscripciones'
import '/src/Styles/GestionEventos.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`

export default function GestionEventos() {
    const navigate = useNavigate()
    const { user, userLoading, checkAuth } = useContext(AuthContext)

    // Estados principales
    const [eventos, setEventos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [formMounted, setFormMounted] = useState(false)
    const [editingEvent, setEditingEvent] = useState(null)
    const [refreshInscripciones, setRefreshInscripciones] = useState(0)

    // Cabeceras para fetch
    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        return null
    }

    // 🔴 Cargar datos al montar
    useEffect(() => {
        checkAuth() // Aseguramos que el auth se actualice
        fetchEventos()
    }, [])

    // Control de montaje del formulario para animaciones
    useEffect(() => {
        if (showForm) setFormMounted(true)
        else setTimeout(() => setFormMounted(false), 300)
    }, [showForm])

    // 🔴 Función para cargar eventos desde API
    const fetchEventos = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch(EVENTOS_ENDPOINT, {
                method: 'GET',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            const normalized = Array.isArray(data) ? data : data.results || []
            setEventos(normalized)
        } catch (err) {
            console.error('Error cargando eventos:', err)
            setError('No se pudieron cargar los eventos.')
        } finally {
            setLoading(false)
        }
    }

    // 🔴 Eliminar evento (solo admins)
    const handleDeleteEvent = async (eventoId) => {
        if (!window.confirm('¿Estás seguro que deseas eliminar este evento?')) return
        setLoading(true)
        try {
            const headers = getAuthHeaders(true)
            const csrftoken = getCookie('csrftoken')
            if (csrftoken) headers['X-CSRFToken'] = csrftoken

            const res = await fetch(`${EVENTOS_ENDPOINT}${eventoId}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers
            })

            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            setError('')
            await fetchEventos()
        } catch (err) {
            console.error('Error eliminando evento:', err)
            setError('Error al eliminar el evento.')
        } finally {
            setLoading(false)
        }
    }

    // 🔴 Callbacks para Add/Edit form
    const handleAddEvent = () => {
        setShowForm(false)
        setEditingEvent(null)
        fetchEventos()
    }

    const handleUpdateEvent = () => {
        setShowForm(false)
        setEditingEvent(null)
        setRefreshInscripciones(prev => prev + 1)
        fetchEventos()
    }

    const handleEditEvent = (evento) => {
        setEditingEvent(evento)
        setShowForm(true)
    }

    const toggleForm = () => setShowForm(s => {
        const next = !s
        if (next) setEditingEvent(null)
        return next
    })

    // 🔴 Determinar permisos
    const isAdmin = !!user && user.is_superuser
    const isStaff = !!user && user.is_staff

    // 🔴 Restricción de acceso: solo admin o staff
    useEffect(() => {
        if (!userLoading && !isAdmin && !isStaff) {
            navigate('/') // Redirigir si no tiene permiso
        }
    }, [userLoading, isAdmin, isStaff, navigate])

    // 🔴 Loading inicial
    if (userLoading || loading) return <p className="loading-text">Cargando datos...</p>

    return (
        <div className="gestion-eventos-container">
            <h1 className="gestion-title">Gestión de Eventos</h1>

            {error && <div className="error-banner">{error}</div>}

            {/* Formulario de añadir/editar evento (solo admins pueden abrirlo) */}
            {formMounted && isAdmin && (
                <div className={`add-event-overlay ${showForm ? 'visible' : 'hidden'}`} onClick={toggleForm}>
                    <div className="add-event-form" onClick={(e) => e.stopPropagation()}>
                        <AddEventForm
                            onAddEvent={handleAddEvent}
                            initialData={editingEvent}
                            onUpdate={handleUpdateEvent}
                            onCancel={() => { setShowForm(false); setEditingEvent(null) }}
                        />
                    </div>
                </div>
            )}

            {/* Lista de eventos */}
            <div className="eventos-list-section">
                <h2 className="section-title">Eventos Creados</h2>

                {eventos.length === 0 && <p className="no-events-text">No hay eventos creados aún.</p>}

                {eventos.length > 0 && (
                    <div className="eventos-grid">
                        {eventos.map(evento => (
                            <div key={evento.id_evento} className="evento-card">
                                <div className="evento-header">
                                    <h3 className="evento-title">{evento.nombre_evento}</h3>
                                    <div className="evento-actions">
                                        {/* Solo admin puede editar o eliminar */}
                                        {isAdmin && (
                                            <>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleEditEvent(evento)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDeleteEvent(evento.id_evento)}
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {evento.descripcion_evento && (
                                    <p className="evento-description">{evento.descripcion_evento}</p>
                                )}

                                <div className="evento-details">
                                    {evento.fecha_inicio && (
                                        <div className="detail-row">
                                            <span className="detail-label">Inicio:</span>
                                            <span className="detail-value">
                                                {evento.fecha_inicio} {evento.hora_inicio || ''}
                                            </span>
                                        </div>
                                    )}

                                    {evento.fecha_final && (
                                        <div className="detail-row">
                                            <span className="detail-label">Fin:</span>
                                            <span className="detail-value">
                                                {evento.fecha_final} {evento.hora_final || ''}
                                            </span>
                                        </div>
                                    )}

                                    {evento.lugar && (
                                        <div className="detail-row">
                                            <span className="detail-label">Lugar:</span>
                                            <span className="detail-value">{evento.lugar}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Toolbar */}
            <div className="gestion-toolbar">
                {isAdmin && (
                    <button className="toolbar-btn" onClick={toggleForm}>
                        {showForm ? 'Cancelar' : 'Añadir Evento'}
                    </button>
                )}
                <button className="toolbar-btn" onClick={() => navigate('/calendario')}>
                    Volver al Calendario
                </button>
            </div>

            {/* Ver inscripciones (staff y admin pueden ver) */}
            <VerInscripciones refreshTrigger={refreshInscripciones} />
        </div>
    )
}
