// src/Components/Calendario/Calendar.jsx
import React, { useState, useEffect } from 'react'
import AddEventForm from './AddEventForm'
import CalendarViews from './CalendarViews'

const Calendar = () => {
    const [events, setEvents] = useState([])
    const [showForm, setShowForm] = useState(false)

    // Simulación de carga desde API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = [
                    {
                        id: 1,
                        title: 'Evento desde API',
                        description: 'Este evento viene de la base de datos',
                        start: '2025-11-15T10:00:00',
                        end: '2025-11-15T12:00:00',
                        location: 'Dojo Koi-Do'
                    },
                    {
                        id: 2,
                        title: 'Torneo',
                        description: 'Competencia regional',
                        start: '2025-11-20',
                        end: '2025-11-22',
                        allDay: true,
                        location: 'Gimnasio Nacional'
                    }
                ]
                setEvents(data)
            } catch (error) {
                console.error('Error cargando eventos:', error)
            }
        }

        fetchEvents()
    }, [])

    const handleAddEvent = (newEvent) => {
        setEvents((prev) => [...prev, newEvent])
    }

    const toggleForm = () => {
        setShowForm((prev) => !prev)
    }

    return (
        <div>
            <h2>Mi Calendario</h2>

            <button onClick={toggleForm}>
                {showForm ? 'Cancelar' : 'Añadir Evento'}
            </button>

            {showForm && (
                <div style={{ marginTop: '1rem' }}>
                    <AddEventForm onAddEvent={handleAddEvent} />
                </div>
            )}

            <CalendarViews events={events} />
        </div>
    )
}

export default Calendar
