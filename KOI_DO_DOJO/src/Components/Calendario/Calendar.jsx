import React, { useState, useEffect } from 'react'
import AddEventForm from './AddEventForm'
import CalendarViews from './CalendarViews'
import '/src/Styles/CalendarioBase.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`

const mapEventFromApi = (ev) => ({
    id: ev.id_evento ?? ev.id,
    title: ev.nombre_evento ?? ev.title ?? 'Evento',
    description: ev.descripcion_evento ?? ev.description ?? '',
    start: ev.fecha_inicio ?? ev.start,
    end: ev.fecha_final ?? ev.end,
    allDay: !!(ev.todo_dia ?? ev.allDay),
    location: ev.lugar ?? ev.location ?? ''
})

const Calendar = () => {
    const [events, setEvents] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formMounted, setFormMounted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    useEffect(() => {
        const fetchEvents = async () => {
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
                setEvents(normalized.map(mapEventFromApi))
            } catch (err) {
                console.error('Error cargando eventos:', err)
                setError('No se pudieron cargar eventos desde la base de datos.')
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    useEffect(() => {
        if (showForm) setFormMounted(true)
        else setTimeout(() => setFormMounted(false), 300)
    }, [showForm])

    const handleAddEvent = (newEvent) => {
        const mapped = mapEventFromApi(newEvent)
        setEvents((prev) => [...prev, mapped])
    }

    const toggleForm = () => setShowForm((s) => !s)

    return (
        <div className="calendar-container">
            <h2 className="calendar-title">Mi Calendario</h2>

            <div className="calendar-main">
                {loading ? (
                    <div style={{ color: '#666', padding: 12 }}>Cargando eventos...</div>
                ) : error ? (
                    <div style={{ color: 'red', padding: 12 }}>{error}</div>
                ) : (
                    <CalendarViews events={events} />
                )}
            </div>

            {formMounted && (
                <div className={`add-event-overlay ${showForm ? 'visible' : 'hidden'}`} onClick={toggleForm}>
                    <div className="add-event-form" onClick={(e) => e.stopPropagation()}>
                        <AddEventForm onAddEvent={handleAddEvent} />
                    </div>
                </div>
            )}

            <div className="calendar-toolbar">
                <button className="toggle-form-btn" onClick={toggleForm}>
                    {showForm ? 'Cancelar' : 'Añadir Evento'}
                </button>
            </div>
        </div>
    )
}

export default Calendar