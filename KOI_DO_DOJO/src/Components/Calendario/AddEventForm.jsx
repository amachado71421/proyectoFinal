import React, { useState, useEffect } from 'react'
import '/src/Styles/AddEventForm.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const CATEGORIAS_ENDPOINT = `${API_URL}/api/categorias/`
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`

export default function AddEventForm({
    onAddEvent,
    initialData = null,
    onUpdate,
    onCancel
}) {
    /* =========================
       ESTADO
    ========================= */
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

    /* =========================
       HELPERS
    ========================= */
    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        return null
    }

    /* =========================
       CARGAR CATEGORÍAS
    ========================= */
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch(CATEGORIAS_ENDPOINT, {
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!res.ok) throw new Error()

                const data = await res.json()
                const list = Array.isArray(data) ? data : data.results || []

                setAvailableTags(
                    list.map(tag => ({
                        id: tag.id_categoria ?? tag.id,
                        nombre: tag.nombre_categoria ?? tag.nombre
                    }))
                )
            } catch {
                setError('Error al cargar categorías del servidor.')
            }
        }

        fetchCategorias()
    }, [])

    /* =========================
       PREFILL (EDICIÓN)
    ========================= */
    useEffect(() => {
        if (!initialData) return

        setFormData({
            nombre_evento: initialData.nombre_evento ?? initialData.title ?? '',
            descripcion: initialData.descripcion_evento ?? initialData.description ?? '',
            fecha_inicio: initialData.fecha_inicio ?? '',
            hora_inicio: initialData.hora_inicio ?? '',
            fecha_final: initialData.fecha_final ?? '',
            hora_fin: initialData.hora_final ?? '',
            todo_dia: !!initialData.todo_dia,
            ubicacion: initialData.lugar ?? initialData.location ?? '',
            categorias: (initialData.categorias || initialData.tags || []).map(c => ({
                id: c.id_categoria ?? c.id,
                nombre: c.nombre_categoria ?? c.nombre
            }))
        })
    }, [initialData])

    /* =========================
       HANDLERS
    ========================= */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleTagClick = (tag) => {
        if (!formData.categorias.some(t => t.id === tag.id)) {
            setFormData(prev => ({
                ...prev,
                categorias: [...prev.categorias, tag]
            }))
        }
    }

    const handleRemoveTag = (id) => {
        setFormData(prev => ({
            ...prev,
            categorias: prev.categorias.filter(t => t.id !== id)
        }))
    }

    /* =========================
       SUBMIT
    ========================= */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.nombre_evento.trim()) {
            setError('El título del evento es requerido.')
            return
        }

        if (!formData.fecha_inicio) {
            setError('La fecha de inicio es requerida.')
            return
        }

        setLoading(true)

        try {
            const payload = {
                nombre_evento: formData.nombre_evento.trim(),
                descripcion_evento: formData.descripcion.trim(),
                fecha_inicio: formData.fecha_inicio,
                fecha_final: formData.fecha_final || null,
                hora_inicio: formData.hora_inicio || null,
                hora_final: formData.hora_fin || null,
                lugar: formData.ubicacion.trim() || null,
                categorias: formData.categorias.map(c => c.id)
            }

            const headers = getAuthHeaders(true)
            const csrftoken = getCookie('csrftoken')
            if (csrftoken) headers['X-CSRFToken'] = csrftoken

            const isEdit = Boolean(initialData?.id_evento || initialData?.id)
            const url = isEdit
                ? `${EVENTOS_ENDPOINT}${initialData.id_evento ?? initialData.id}/`
                : EVENTOS_ENDPOINT

            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                credentials: 'include',
                headers,
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error()

            const data = await res.json()

            if (isEdit) {
                onUpdate?.(data)
            } else {
                onAddEvent?.(data)
            }

            /* =========================
               🔁 RECARGA DE PÁGINA
            ========================= */
            window.location.reload()

        } catch {
            setError('Error de conexión al guardar evento.')
        } finally {
            setLoading(false)
        }
    }

    /* =========================
       RENDER
    ========================= */
    return (
        <form className="add-event-form" onSubmit={handleSubmit}>
            <h3 className="form-title">
                {initialData ? 'Editar evento' : 'Añadir evento'}
            </h3>

            {error && (
                <div
                    style={{
                        color: 'red',
                        marginBottom: 12,
                        padding: 8,
                        backgroundColor: '#fee',
                        borderRadius: 4
                    }}
                >
                    {error}
                </div>
            )}

            <div className="form-row">
                <input
                    className="form-input"
                    name="nombre_evento"
                    placeholder="Título"
                    value={formData.nombre_evento}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <input
                    className="form-input"
                    name="descripcion"
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row form-grid-2">
                <div className="form-group">
                    <label className="form-label">Fecha inicio</label>
                    <input
                        className="form-input"
                        type="date"
                        name="fecha_inicio"
                        value={formData.fecha_inicio}
                        onChange={handleChange}
                        required
                    />
                </div>

                {!formData.todo_dia && (
                    <div className="form-group">
                        <label className="form-label">Hora inicio</label>
                        <input
                            className="form-input"
                            type="time"
                            name="hora_inicio"
                            value={formData.hora_inicio}
                            onChange={handleChange}
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
                        name="fecha_final"
                        value={formData.fecha_final}
                        onChange={handleChange}
                    />
                </div>

                {!formData.todo_dia && (
                    <div className="form-group">
                        <label className="form-label">Hora fin</label>
                        <input
                            className="form-input"
                            type="time"
                            name="hora_fin"
                            value={formData.hora_fin}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>

            <div className="form-row">
                <input
                    className="form-input"
                    name="ubicacion"
                    placeholder="Lugar"
                    value={formData.ubicacion}
                    onChange={handleChange}
                />
            </div>

            <label className="form-checkbox">
                <input
                    type="checkbox"
                    name="todo_dia"
                    checked={formData.todo_dia}
                    onChange={handleChange}
                />
                Todo el día
            </label>

            <div className="tags-section">
                <button
                    type="button"
                    className="toggle-tags-btn"
                    onClick={() => setShowTags(v => !v)}
                >
                    {showTags ? 'Ocultar categorías' : 'Añadir categorías'}
                </button>

                {showTags && (
                    <div className="available-tags">
                        <p className="tags-title">Selecciona categorías:</p>
                        <div className="tags-grid">
                            {availableTags.map(tag => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    className="tag-btn"
                                    onClick={() => handleTagClick(tag)}
                                >
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
                                    <button
                                        type="button"
                                        className="remove-tag-btn"
                                        onClick={() => handleRemoveTag(tag.id)}
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: 8,
                    justifyContent: 'center',
                    marginTop: 12
                }}
            >
                <button
                    type="submit"
                    className="submit-btn add-event-btn"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : initialData ? 'Guardar cambios' : 'Añadir evento'}
                </button>

                {initialData && (
                    <button
                        type="button"
                        className="submit-btn"
                        onClick={onCancel}
                        disabled={loading}
                        style={{ background: '#aaa' }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}
