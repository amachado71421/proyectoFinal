import React, { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const ENDPOINT = `${API_URL}/api/categorias/`

function CrearEtiquetas() {
    const [tagName, setTagName] = useState('')
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [actionLoadingId, setActionLoadingId] = useState(null)

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true)
            setError('')

            try {
                const res = await fetch(ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!res.ok) throw new Error(`HTTP ${res.status}`)

                const data = await res.json()
                const normalized = Array.isArray(data) ? data : data.results || []

                setTags(
                    normalized.map(tag => ({
                        id: tag.id_categoria || tag.id,
                        nombre: tag.nombre_categoria || tag.nombre
                    }))
                )
            } catch (err) {
                console.error('Error cargando categorías:', err)
                setError('Error al cargar categorías.')
            } finally {
                setLoading(false)
            }
        }

        fetchTags()
    }, [])

    const handleChange = (e) => {
        setTagName(e.target.value)
    }

    const handleAddTag = async () => {
        if (tagName.trim() === '') {
            setError('El nombre de la categoría no puede estar vacío.')
            return
        }

        setLoading(true)
        setError('')

        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ nombre_categoria: tagName.trim() })
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                setError(data.detail || JSON.stringify(data) || 'Error al crear categoría.')
                return
            }

            setTags(prev => [
                ...prev,
                {
                    id: data.id_categoria || data.id,
                    nombre: data.nombre_categoria || tagName.trim()
                }
            ])
            setTagName('')
        } catch (err) {
            console.error('Error al crear categoría:', err)
            setError('Error de conexión al crear categoría.')
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveTag = async (tagId) => {
        if (!window.confirm('¿Eliminar esta categoría?')) return

        setActionLoadingId(tagId)
        setError('')

        try {
            const res = await fetch(`${ENDPOINT}${tagId}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })

            if (res.status === 204 || res.ok) {
                setTags(prev => prev.filter(tag => tag.id !== tagId))
            } else {
                const data = await res.json().catch(() => ({}))
                setError(data.detail || 'Error al eliminar categoría.')
            }
        } catch (err) {
            console.error('Error al eliminar categoría:', err)
            setError('Error de conexión al eliminar categoría.')
        } finally {
            setActionLoadingId(null)
        }
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Categorías para el calendario</h2>

            {error && <div style={{ color: 'red', marginBottom: 12, padding: 8, backgroundColor: '#fee', borderRadius: 4 }}>{error}</div>}

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Nombre de categoría"
                    value={tagName}
                    onChange={handleChange}
                    style={{ padding: '0.5rem', marginRight: '0.5rem' }}
                />
                <button
                    onClick={handleAddTag}
                    disabled={loading}
                    style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                >
                    {loading ? 'Guardando...' : 'Añadir categoría'}
                </button>
            </div>

            {tags.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Categorías creadas</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {tags.map(tag => (
                            <li
                                key={tag.id}
                                style={{
                                    marginBottom: '0.5rem',
                                    padding: '0.5rem',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: 4,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span>{tag.nombre}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag.id)}
                                    disabled={actionLoadingId === tag.id}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        color: 'white',
                                        backgroundColor: '#d9534f',
                                        border: 'none',
                                        borderRadius: 4,
                                        cursor: 'pointer'
                                    }}
                                >
                                    ❌ Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CrearEtiquetas