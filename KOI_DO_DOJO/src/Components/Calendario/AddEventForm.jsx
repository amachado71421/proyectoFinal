// src/AddEventForm.jsx
import React, { useState, useEffect } from 'react'

const AddEventForm = ({ onAddEvent }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        allDay: false,
        location: '',
        tags: []
    })

    const [availableTags, setAvailableTags] = useState([])
    const [showTags, setShowTags] = useState(false)

    // Simulación de carga de etiquetas desde API
    useEffect(() => {
        const fetchTags = async () => {
            try {
                // Aquí más adelante pondrás tu endpoint real
                // const response = await fetch("http://localhost:8000/api/tags")
                // const data = await response.json()
                // setAvailableTags(data)

                // Por ahora etiquetas estáticas
                setAvailableTags(['Karate', 'Torneo', 'Entrenamiento', 'Examen', 'Social'])
            } catch (error) {
                console.error('Error cargando etiquetas:', error)
            }
        }

        fetchTags()
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        let newValue = value
        if (type === 'checkbox') {
            newValue = checked
        }
        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }))
    }

    const handleTagClick = (tag) => {
        if (!formData.tags.includes(tag)) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tag]
            }))
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let start = ''
        let end = ''

        if (formData.allDay) {
            start = formData.startDate
            if (formData.endDate) {
                end = formData.endDate
            } else {
                end = formData.startDate
            }
        } else {
            start = formData.startDate + 'T' + formData.startTime
            if (formData.endDate) {
                end = formData.endDate + 'T' + formData.endTime
            } else {
                end = formData.startDate + 'T' + formData.endTime
            }
        }

        const newEvent = {
            title: formData.title,
            description: formData.description,
            start,
            end,
            allDay: formData.allDay,
            location: formData.location,
            tags: formData.tags
        }

        onAddEvent(newEvent)

        // Resetear formulario
        setFormData({
            title: '',
            description: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            allDay: false,
            location: '',
            tags: []
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Añadir Evento</h3>

            <input name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
            <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

            {formData.allDay === false && (
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
            )}

            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

            {formData.allDay === false && (
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
            )}

            <input name="location" placeholder="Lugar" value={formData.location} onChange={handleChange} />

            <label>
                <input type="checkbox" name="allDay" checked={formData.allDay} onChange={handleChange} />
                Todo el día
            </label>

            {/* Botón para mostrar/ocultar etiquetas */}
            <div style={{ marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowTags(!showTags)}>
                    {showTags ? 'Ocultar etiquetas' : 'Añadir etiquetas'}
                </button>

                {showTags && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <p>Selecciona etiquetas:</p>
                        {availableTags.map((tag) => (
                            <button
                                type="button"
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}

                {/* Lista de etiquetas añadidas con opción de quitar */}
                {formData.tags.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <strong>Etiquetas añadidas:</strong>
                        <ul>
                            {formData.tags.map((tag, index) => (
                                <li key={index}>
                                    {tag}{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        style={{ marginLeft: '0.5rem', color: 'red' }}
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <button type="submit" style={{ marginTop: '1rem' }}>Agregar</button>
        </form>
    )
}

export default AddEventForm
