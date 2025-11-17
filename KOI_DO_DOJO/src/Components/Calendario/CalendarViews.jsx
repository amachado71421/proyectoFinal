// src/Components/Calendario/CalendarViews.jsx
import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import '/src/Styles/CalendarioTemporal.css';

const CalendarViews = ({ events }) => {
    const calendarRef = useRef(null)

    const changeView = (viewName) => {
        const calendarApi = calendarRef.current.getApi()
        calendarApi.changeView(viewName)
    }

    return (
        <div>
            {/*Botones personalizados para cambiar la vista */}
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => changeView('dayGridMonth')}>Mes</button>
                <button onClick={() => changeView('timeGridWeek')}>Semana</button>
                <button onClick={() => changeView('timeGridDay')}>Día</button>
                <button onClick={() => changeView('listWeek')}>Lista</button>
                <button onClick={() => changeView('multiMonthYear')}>Multi-Mes</button>
            </div>

            <FullCalendar
                ref={calendarRef}
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
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
