import React, { useState, useEffect } from 'react'
import '/src/Styles/CrearLogros.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const LOGROS_ENDPOINT = `${API_URL}/api/logros/`

export default function CrearLogros() {
    const [logros, setLogros] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [savingLogroId, setSavingLogroId] = useState(null)

    const [formData, setFormData] = useState({
        nombre_logro: '',
        descripcion_logro: ''
    })
    const [submitting, setSubmitting] = useState(false)

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'))
        return match ? decodeURIComponent(match[2]) : null
    }

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        const csrf = getCookie('csrftoken')
        if (csrf) headers['X-CSRFToken'] = csrf
        return headers
    }

    useEffect(() => {
        const fetchLogros = async () => {
            setLoading(true)
            setError('')

            try {
                const res = await fetch(LOGROS_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!res.ok) throw new Error(`HTTP ${res.status}`)

                const data = await res.json()
                const normalized = Array.isArray(data) ? data : data.results || []

                setLogros(
                    normalized.map(logro => ({
                        id: logro.id_logro || logro.id,
                        nombre: logro.nombre_logro || logro.nombre,
                        descripcion: logro.descripcion_logro || logro.descripcion || '',
                        fecha_creacion: logro.fecha_creacion || new Date().toISOString()
                    }))
                )
            } catch (err) {
                console.error('Error cargando logros:', err)
                setError('Error al cargar logros.')
            } finally {
                setLoading(false)
            }
        }

        fetchLogros()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.nombre_logro.trim()) {
            setError('El nombre del logro es requerido.')
            return
        }

        setSubmitting(true)
        setError('')

        try {
            const body = {
                nombre_logro: formData.nombre_logro.trim(),
                descripcion_logro: formData.descripcion_logro.trim()
            }

            const res = await fetch(LOGROS_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify(body)
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                setError(data.detail || JSON.stringify(data) || 'Error al crear logro.')
                return
            }

            setLogros(prev => [
                ...prev,
                {
                    id: data.id_logro || data.id,
                    nombre: data.nombre_logro || formData.nombre_logro.trim(),
                    descripcion: data.descripcion_logro || formData.descripcion_logro.trim(),
                    fecha_creacion: data.fecha_creacion || new Date().toISOString()
                }
            ])

            setFormData({
                nombre_logro: '',
                descripcion_logro: ''
            })
        } catch (err) {
            console.error('Error al crear logro:', err)
            setError('Error de conexión al crear logro.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteLogro = async (logroId) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este logro?')) return

        setSavingLogroId(logroId)
        setError('')

        try {
            const res = await fetch(`${LOGROS_ENDPOINT}${logroId}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })

            if (res.status === 204 || res.ok) {
                setLogros(prev => prev.filter(logro => logro.id !== logroId))
            } else {
                const data = await res.json().catch(() => ({}))
                setError(data.detail || 'Error al eliminar logro.')
            }
        } catch (err) {
            console.error('Error al eliminar logro:', err)
            setError('Error de conexión al eliminar logro.')
        } finally {
            setSavingLogroId(null)
        }
    }

    return (
        <div className="crear-logros-container">
            <h2>Gestionar Logros</h2>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="crear-logro-form">
                <h3>Crear nuevo logro</h3>

                <div className="form-group">
                    <label htmlFor="nombre_logro">Nombre del logro *</label>
                    <input
                        id="nombre_logro"
                        type="text"
                        name="nombre_logro"
                        placeholder="Ej: Cinturón Negro"
                        value={formData.nombre_logro}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion_logro">Descripción</label>
                    <textarea
                        id="descripcion_logro"
                        name="descripcion_logro"
                        placeholder="Descripción del logro (opcional)"
                        value={formData.descripcion_logro}
                        onChange={handleChange}
                        className="form-textarea"
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={submitting}
                >
                    {submitting ? 'Creando...' : 'Crear logro'}
                </button>
            </form>

            <div className="logros-list">
                <h3>Logros creados ({logros.length})</h3>

                {loading ? (
                    <div className="loading-message">Cargando logros...</div>
                ) : logros.length === 0 ? (
                    <div className="empty-message">No hay logros creados aún.</div>
                ) : (
                    <ul className="logros-ul">
                        {logros.map(logro => (
                            <li key={logro.id} className="logro-item">
                                <div className="logro-info">
                                    <h4 className="logro-nombre">{logro.nombre}</h4>
                                    {logro.descripcion && (
                                        <p className="logro-descripcion">{logro.descripcion}</p>
                                    )}
                                    <small className="logro-fecha">
                                        Creado: {new Date(logro.fecha_creacion).toLocaleDateString('es-ES')}
                                    </small>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteLogro(logro.id)}
                                    disabled={savingLogroId === logro.id}
                                    className="delete-btn"
                                    title="Eliminar logro"
                                >
                                    {savingLogroId === logro.id ? '...' : 'Eliminar'}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
