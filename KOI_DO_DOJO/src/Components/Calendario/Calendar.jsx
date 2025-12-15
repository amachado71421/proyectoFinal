import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import AddEventForm from './AddEventForm'
import CalendarViews from './CalendarViews'
import '/src/Styles/CalendarioBase.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`

const mapEventFromApi = (ev) => ({
    id: ev.id_evento ?? ev.id,
    title: ev.nombre_evento ?? ev.title ?? 'Evento',
    start: ev.fecha_inicio ?? ev.start,
    end: ev.fecha_final ?? ev.end,
    allDay: !!(ev.todo_dia ?? ev.allDay),
})

const Calendar = () => {
    const navigate = useNavigate()
    const { user, userLoading, checkAuth } = useContext(AuthContext)

    const [events, setEvents] = useState([])
    const [loadingEvents, setLoadingEvents] = useState(true)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(EVENTOS_ENDPOINT, { credentials: 'include' })
                const data = await res.json()
                const normalized = Array.isArray(data) ? data : data.results || []
                setEvents(normalized.map(mapEventFromApi))
            } catch {
                setError('No se pudieron cargar eventos')
            } finally {
                setLoadingEvents(false)
            }
        }
        fetchEvents()
    }, [])

    const isSuperuser = !!user?.is_superuser
    const isStaff = !!user?.is_staff

    if (userLoading) {
        return <div className="calendar-loading">Verificando sesión...</div>
    }

    return (
        <div className="calendar-container">
            <h2 className="calendar-title">Mi Calendario</h2>

            <div className="calendar-main">
                {loadingEvents ? (
                    <div className="calendar-loading">Cargando eventos...</div>
                ) : error ? (
                    <div className="calendar-error">{error}</div>
                ) : (
                    <CalendarViews events={events} />
                )}
            </div>

            {/* =======================
                TOOLBAR
                ======================= */}
            <div className="calendar-toolbar">

                {/* SUPERUSER */}
                {isSuperuser && (
                    <>
                        <button
                            className="toggle-form-btn"
                            onClick={() => setShowForm(true)}
                        >
                            Añadir Evento
                        </button>

                        <button
                            className="toggle-form-btn"
                            onClick={() => navigate('/gestion-eventos')}
                        >
                            Gestionar Eventos
                        </button>
                    </>
                )}

                {/* STAFF */}
                {!isSuperuser && isStaff && (
                    <button
                        className="toggle-form-btn"
                        onClick={() => navigate('/gestion-eventos')}
                    >
                        Gestionar Eventos
                    </button>
                )}

                {/* TODOS */}
                <button
                    className="toggle-form-btn"
                    onClick={() => navigate('/inscribirse-evento')}
                >
                    Inscribirse
                </button>
            </div>

            {/* =======================
                MODAL ADD EVENT
                ======================= */}
            {showForm && isSuperuser && (
                <div className="add-event-overlay visible" onClick={() => setShowForm(false)}>
                    <div className="add-event-form" onClick={(e) => e.stopPropagation()}>
                        <AddEventForm onClose={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Calendar
