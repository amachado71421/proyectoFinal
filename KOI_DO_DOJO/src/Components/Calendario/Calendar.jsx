import React, { useState, useEffect } from 'react'
import AddEventForm from './AddEventForm'
import CalendarViews from './CalendarViews'
import '/src/Styles/CalendarioBase.css'

const Calendar = () => {
    const [events, setEvents] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formMounted, setFormMounted] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
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
        }

        fetchEvents()
    }, [])

    useEffect(() => {
        if (showForm) {
            setFormMounted(true)
        } else {
            setTimeout(() => setFormMounted(false), 300) // espera a que termine la animación
        }
    }, [showForm])

    const handleAddEvent = (newEvent) => {
        setEvents((prev) => [...prev, newEvent])
    }

    const toggleForm = () => {
        setShowForm((prev) => !prev)
    }

    return (
        <div className="calendar-container">
            <h2 className="calendar-title">Mi Calendario</h2>

            <div className="calendar-main">
                <CalendarViews events={events} />
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
