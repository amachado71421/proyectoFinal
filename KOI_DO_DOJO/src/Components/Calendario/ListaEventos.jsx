// src/Components/Calendario/CalendarListView.jsx
import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import '/src/Styles/CalendarioTemporal.css'

const ListaEventos = () => {
    const calendarRef = useRef(null)

    // 🔥 Datos quemados de ejemplo
    const eventosDemo = [
        {
            title: 'Clase de Karate - Principiantes',
            start: '2025-11-19T10:00:00',
            end: '2025-11-19T11:00:00',
        },
        {
            title: 'Entrenamiento Avanzado',
            start: '2025-11-20T18:00:00',
            end: '2025-11-20T19:30:00',
        },
        {
            title: 'Examen de Cinturón',
            start: '2025-11-21T14:00:00',
            end: '2025-11-21T16:00:00',
        },
        {
            title: 'Reunión de Instructores',
            start: '2025-11-22T09:00:00',
            end: '2025-11-22T10:30:00',
        },
        {
            title: 'Clase Especial con Maestro Invitado',
            start: '2025-11-23T15:00:00',
            end: '2025-11-23T17:00:00',
        },
    ]

    return (
        <div className="calendar-list-container">
            <FullCalendar
                ref={calendarRef}
                plugins={[listPlugin, interactionPlugin]}
                initialView="listWeek"   // puedes cambiar a "listMonth" si prefieres
                events={eventosDemo}     // 🔥 usamos los datos quemados
                selectable={true}
                editable={true}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '' // sin botones de cambio de vista
                }}
                noEventsContent="No hay eventos programados"
            />
        </div>
    )
}

export default ListaEventos
