// src/Components/Calendario/CalendarViews.jsx
import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import '/src/Styles/CalendarioTemporal.css'

const CalendarViews = ({ events }) => {
    const calendarRef = useRef(null)
    const [currentView, setCurrentView] = useState('dayGridMonth')
    const [menuOpen, setMenuOpen] = useState(false)

    const changeView = (viewName) => {
        const calendarApi = calendarRef.current.getApi()
        calendarApi.changeView(viewName)
        setCurrentView(viewName)
        setMenuOpen(false) // cerrar menú al seleccionar
    }

    // Diccionario para mostrar nombres bonitos (sin lista)
    const viewLabels = {
        dayGridMonth: 'Mes',
        timeGridWeek: 'Semana',
        timeGridDay: 'Día',
        multiMonthYear: 'Multi-Mes'
    }

    return (
        <div>
            {/* Barra de botones personalizada */}
            <div className="calendar-toolbar">
                {/* Desktop: todos los botones visibles */}
                <div className="calendar-toolbar-desktop">
                    {Object.entries(viewLabels).map(([view, label]) => (
                        <button
                            key={view}
                            className={`calendar-btn ${currentView === view ? 'calendar-btn-active-selected' : ''}`}
                            onClick={() => changeView(view)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Mobile: solo botón actual + menú desplegable */}
                <div className="calendar-toolbar-mobile">
                    <button
                        className="calendar-btn calendar-btn-active-selected"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {viewLabels[currentView]}
                    </button>

                    {menuOpen && (
                        <div className="calendar-menu">
                            {Object.entries(viewLabels).map(([view, label]) => (
                                <button
                                    key={view}
                                    className="calendar-btn"
                                    onClick={() => changeView(view)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Calendario principal */}
            <FullCalendar
                ref={calendarRef}
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    multiMonthPlugin
                ]}
                initialView="dayGridMonth"
                events={events}
                selectable={true}
                editable={true}
            />
        </div>
    )
}

export default CalendarViews
