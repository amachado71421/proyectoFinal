// src/Components/AddEventForm.jsx
import React, { useState, useEffect } from 'react'
import '/src/Styles/AddEventForm.css'

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

    useEffect(() => {
        setAvailableTags(['Karate', 'Torneo', 'Entrenamiento', 'Examen', 'Social'])
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleTagClick = (tag) => {
        if (!formData.tags.includes(tag)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
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

        const start = formData.allDay
            ? formData.startDate
            : `${formData.startDate}T${formData.startTime || '00:00'}`

        const end = formData.allDay
            ? formData.endDate || formData.startDate
            : formData.endDate
                ? `${formData.endDate}T${formData.endTime || '00:00'}`
                : `${formData.startDate}T${formData.endTime || formData.startTime || '00:00'}`

        const newEvent = {
            title: formData.title,
            description: formData.description,
            start,
            end,
            allDay: formData.allDay,
            location: formData.location,
            tags: formData.tags
        }

        onAddEvent?.(newEvent)

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
        setShowTags(false)
    }

    return (
        <form className="add-event-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Añadir evento</h3>

            <div className="form-row">
                <input
                    className="form-input"
                    name="title"
                    placeholder="Título"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <input
                    className="form-input"
                    name="description"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row form-grid-2">
                <div className="form-group">
                    <label className="form-label">Fecha inicio</label>
                    <input
                        className="form-input"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {!formData.allDay && (
                    <div className="form-group">
                        <label className="form-label">Hora inicio</label>
                        <input
                            className="form-input"
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
            </div>

            <div className="form-row form-grid-2">
                <div className="form-group">
                    <label className="form-label">Fecha fin</label>
                    <input
                        className="form-input"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>

                {!formData.allDay && (
                    <div className="form-group">
                        <label className="form-label">Hora fin</label>
                        <input
                            className="form-input"
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>

            <div className="form-row">
                <input
                    className="form-input"
                    name="location"
                    placeholder="Lugar"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>

            <label className="form-checkbox">
                <input
                    type="checkbox"
                    name="allDay"
                    checked={formData.allDay}
                    onChange={handleChange}
                />
                Todo el día
            </label>

            <div className="tags-section">
                <button
                    type="button"
                    className="toggle-tags-btn"
                    onClick={() => setShowTags(!showTags)}
                >
                    {showTags ? 'Ocultar etiquetas' : 'Añadir etiquetas'}
                </button>

                {showTags && (
                    <div className="available-tags">
                        <p className="tags-title">Selecciona etiquetas:</p>
                        <div className="tags-grid">
                            {availableTags.map((tag) => (
                                <button
                                    type="button"
                                    key={tag}
                                    className="tag-btn"
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {formData.tags.length > 0 && (
                    <div className="selected-tags">
                        <strong>Etiquetas añadidas:</strong>
                        <ul className="tags-list">
                            {formData.tags.map((tag) => (
                                <li key={tag} className="tag-item">
                                    <span className="tag-chip">{tag}</span>
                                    <button
                                        type="button"
                                        className="remove-tag-btn"
                                        onClick={() => handleRemoveTag(tag)}
                                        aria-label={`Quitar etiqueta ${tag}`}
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Botón principal: Añadir evento */}
            <button type="submit" className="submit-btn add-event-btn">
                Añadir evento
            </button>
        </form>
    )
}

export default AddEventForm
