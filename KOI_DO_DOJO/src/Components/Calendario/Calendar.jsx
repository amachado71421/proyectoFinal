// src/Calendar.jsx
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventForm from './AddEventForm'

const Calendar = () => {
    const [events, setEvents] = useState([])
    const [showForm, setShowForm] = useState(false)

    // 🔹 Simulación de carga desde API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Aquí más adelante se pone endpoint real, por ejemplo:
                // const response = await fetch("http://localhost:8000/api/events");
                // const data = await response.json();

                // Por ahora se simulan los datos de prueba:
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
        //Aquí más adelante se hace un post
        // await fetch("http://localhost:8000/api/events", { method: "POST", body: JSON.stringify(newEvent) })
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

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    )
}

export default Calendar
