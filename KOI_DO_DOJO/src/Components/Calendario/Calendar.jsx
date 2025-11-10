// src/Calendar.jsx
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => {
    return (
        <div>
            <h2>Mi Calendario</h2>
            <div>   
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={[
                        { title: 'Evento de prueba', date: '2025-11-15' },
                        { title: 'Reunión', date: '2025-11-20' }
                    ]}
                />
            </div>
        </div>
    )
}

export default Calendar
