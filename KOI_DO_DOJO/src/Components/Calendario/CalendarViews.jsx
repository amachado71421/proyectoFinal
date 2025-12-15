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
        <div className="calendar-views-container">
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

                {/* Mobile: select dropdown */}
                <div className="calendar-toolbar-mobile">
                    <select
                        className="calendar-view-select"
                        value={currentView}
                        onChange={(e) => changeView(e.target.value)}
                    >
                        {Object.entries(viewLabels).map(([view, label]) => (
                            <option key={view} value={view}>
                                {label}
                            </option>
                        ))}
                    </select>
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
