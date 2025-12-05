import React, { useState, useEffect } from 'react'
import '/src/Styles/AddEventForm.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const CATEGORIAS_ENDPOINT = `${API_URL}/api/categorias/`
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`

export default function AddEventForm({ onAddEvent }) {
    const [formData, setFormData] = useState({
        nombre_evento: '',
        descripcion: '',
        fecha_inicio: '',
        hora_inicio: '',
        fecha_final: '',
        hora_fin: '',
        todo_dia: false,
        ubicacion: '',
        categorias: []
    })

    const [availableTags, setAvailableTags] = useState([])
    const [showTags, setShowTags] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch(CATEGORIAS_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                const normalized = Array.isArray(data) ? data : data.results || []
                setAvailableTags(
                    normalized.map(tag => ({
                        id: tag.id_categoria ?? tag.id,
                        nombre: tag.nombre_categoria ?? tag.nombre
                    }))
                )
            } catch (err) {
                console.error('Error cargando categorías:', err)
                setError('Error al cargar categorías del servidor.')
                setAvailableTags([
                    { id: 1, nombre: 'Karate' },
                    { id: 2, nombre: 'Torneo' },
                    { id: 3, nombre: 'Entrenamiento' }
                ])
            }
        }

        fetchCategorias()
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleTagClick = (tag) => {
        if (!formData.categorias.some(t => t.id === tag.id)) {
            setFormData(prev => ({ ...prev, categorias: [...prev.categorias, tag] }))
        }
    }

    const handleRemoveTag = (id) => {
        setFormData(prev => ({ ...prev, categorias: prev.categorias.filter(t => t.id !== id) }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.nombre_evento.trim()) {
            setError('El título del evento es requerido.')
            return
        }
        if (!formData.fecha_inicio) {
            setError('La fecha de inicio es requerida.')
            return
        }

        setLoading(true); setError('')
        try {
            const fechaInicio = formData.todo_dia
                ? formData.fecha_inicio
                : `${formData.fecha_inicio}T${formData.hora_inicio || '00:00'}:00`

            const fechaFinal = formData.todo_dia
                ? (formData.fecha_final || formData.fecha_inicio)
                : (formData.fecha_final
                    ? `${formData.fecha_final}T${formData.hora_fin || '00:00'}:00`
                    : `${formData.fecha_inicio}T${formData.hora_fin || formData.hora_inicio || '00:00'}:00`)

            const body = {
                nombre_evento: formData.nombre_evento.trim(),
                descripcion_evento: formData.descripcion.trim(),
                fecha_inicio: fechaInicio,
                fecha_final: fechaFinal,
                todo_dia: formData.todo_dia,
                lugar: formData.ubicacion.trim(),
                categorias: formData.categorias.map(c => c.id)
            }

            const res = await fetch(EVENTOS_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify(body)
            })

            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                setError(data.detail || JSON.stringify(data) || 'Error al crear evento.')
                return
            }

            onAddEvent?.(data)

            setFormData({
                nombre_evento: '',
                descripcion: '',
                fecha_inicio: '',
                hora_inicio: '',
                fecha_final: '',
                hora_fin: '',
                todo_dia: false,
                ubicacion: '',
                categorias: []
            })
            setShowTags(false)
        } catch (err) {
            console.error('Error de conexión:', err)
            setError('Error de conexión al guardar evento.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="add-event-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Añadir evento</h3>

            {error && <div style={{ color: 'red', marginBottom: 12, padding: 8, backgroundColor: '#fee', borderRadius: 4 }}>{error}</div>}

            <div className="form-row">
                <input className="form-input" name="nombre_evento" placeholder="Título" value={formData.nombre_evento} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <input className="form-input" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />
            </div>

            <div className="form-row form-grid-2">
                <div className="form-group">
                    <label className="form-label">Fecha inicio</label>
                    <input className="form-input" type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />
                </div>

                {!formData.todo_dia && (
                    <div className="form-group">
                        <label className="form-label">Hora inicio</label>
                        <input className="form-input" type="time" name="hora_inicio" value={formData.hora_inicio} onChange={handleChange} />
                    </div>
                )}
            </div>

            <div className="form-row form-grid-2">
                <div className="form-group">
                    <label className="form-label">Fecha fin</label>
                    <input className="form-input" type="date" name="fecha_final" value={formData.fecha_final} onChange={handleChange} />
                </div>

                {!formData.todo_dia && (
                    <div className="form-group">
                        <label className="form-label">Hora fin</label>
                        <input className="form-input" type="time" name="hora_fin" value={formData.hora_fin} onChange={handleChange} />
                    </div>
                )}
            </div>

            <div className="form-row">
                <input className="form-input" name="ubicacion" placeholder="Lugar" value={formData.ubicacion} onChange={handleChange} />
            </div>

            <label className="form-checkbox">
                <input type="checkbox" name="todo_dia" checked={formData.todo_dia} onChange={handleChange} />
                Todo el día
            </label>

            <div className="tags-section">
                <button type="button" className="toggle-tags-btn" onClick={() => setShowTags(s => !s)}>
                    {showTags ? 'Ocultar categorías' : 'Añadir categorías'}
                </button>

                {showTags && (
                    <div className="available-tags">
                        <p className="tags-title">Selecciona categorías:</p>
                        <div className="tags-grid">
                            {availableTags.map(tag => (
                                <button type="button" key={tag.id} className="tag-btn" onClick={() => handleTagClick(tag)}>
                                    {tag.nombre}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {formData.categorias.length > 0 && (
                    <div className="selected-tags">
                        <strong>Categorías añadidas:</strong>
                        <ul className="tags-list">
                            {formData.categorias.map(tag => (
                                <li key={tag.id} className="tag-item">
                                    <span className="tag-chip">{tag.nombre}</span>
                                    <button type="button" className="remove-tag-btn" onClick={() => handleRemoveTag(tag.id)} aria-label={`Quitar categoría ${tag.nombre}`}>❌</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <button type="submit" className="submit-btn add-event-btn" disabled={loading}>
                {loading ? 'Guardando...' : 'Añadir evento'}
            </button>
        </form>
    )
}