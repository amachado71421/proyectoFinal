import React, { useRef, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import '/src/Styles/CalendarioTemporal.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`

const ListaEventos = () => {
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([])
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

                const mapped = normalized.map(ev => ({
                    id: ev.id_evento ?? ev.id,
                    title: ev.nombre_evento ?? ev.title ?? 'Evento',
                    start: ev.fecha_inicio ?? ev.start,
                    end: ev.fecha_final ?? ev.end,
                    allDay: !!ev.todo_dia
                }))

                setEvents(mapped)
            } catch (err) {
                console.error('Error cargando eventos:', err)
                setError('No se pudieron cargar eventos.')
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    return (
        <div className="calendar-list-container">
            {error && <div style={{ color: 'red', padding: 8 }}>{error}</div>}
            <FullCalendar
                ref={calendarRef}
                plugins={[listPlugin, interactionPlugin]}
                initialView="listWeek"
                events={events}
                selectable={true}
                editable={false}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
                noEventsContent={loading ? 'Cargando eventos...' : 'No hay eventos programados'}
            />
        </div>
    )
}

export default ListaEventos