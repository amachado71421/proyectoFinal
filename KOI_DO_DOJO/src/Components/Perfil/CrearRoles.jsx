import React, { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const ENDPOINT = `${API_URL}/api/roles/`

export default function CrearRoles() {
    const [nombre, setNombre] = useState('')
    const [roles, setRoles] = useState([])
    const [editId, setEditId] = useState(null)
    const [editNombre, setEditNombre] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    useEffect(() => {
        const load = async () => {
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
                setRoles(data.map(r => ({ id: r.id_rol ?? r.id, nombre: r.nombre_rol ?? r.nombre })))
            } catch (err) {
                console.error(err)
                setError('No se pudieron cargar roles.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const handleAdd = async () => {
        const n = nombre.trim()
        if (!n) return
        setLoading(true)
        setError('')
        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ nombre_rol: n })
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                setError(data.detail || 'Error al crear rol.')
                return
            }
            setRoles(prev => [...prev, { id: data.id_rol ?? data.id, nombre: data.nombre_rol ?? n }])
            setNombre('')
        } catch (err) {
            console.error(err)
            setError('Error de conexión al crear rol.')
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (r) => {
        setEditId(r.id)
        setEditNombre(r.nombre)
    }

    const saveEdit = async () => {
        const n = editNombre.trim()
        if (!n || editId == null) return
        setLoading(true)
        setError('')
        try {
            const res = await fetch(`${ENDPOINT}${editId}/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ nombre_rol: n })
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                setError(data.detail || 'Error al actualizar rol.')
                return
            }
            setRoles(prev => prev.map(r => r.id === editId ? { id: r.id, nombre: data.nombre_rol ?? n } : r))
            setEditId(null)
            setEditNombre('')
        } catch (err) {
            console.error(err)
            setError('Error de conexión al actualizar rol.')
        } finally {
            setLoading(false)
        }
    }

    const removeRole = async (id) => {
        if (!window.confirm('Eliminar rol?')) return
        setLoading(true)
        setError('')
        try {
            const res = await fetch(`${ENDPOINT}${id}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })
            if (res.status === 204 || res.ok) {
                setRoles(prev => prev.filter(r => r.id !== id))
            } else {
                const data = await res.json().catch(() => ({}))
                setError(data.detail || 'Error al eliminar rol.')
            }
        } catch (err) {
            console.error(err)
            setError('Error de conexión al eliminar rol.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Gestionar Roles</h2>

            {error && <div style={{ color: 'red', marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#fee', borderRadius: 4 }}>{error}</div>}

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Nombre del rol"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    style={{ padding: '0.5rem', marginRight: '0.5rem' }}
                />
                <button onClick={handleAdd} disabled={loading} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    Crear
                </button>
            </div>

            {loading && <div style={{ color: '#666' }}>Cargando...</div>}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {roles.map(r => (
                    <li key={r.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                        {editId === r.id ? (
                            <>
                                <input
                                    value={editNombre}
                                    onChange={e => setEditNombre(e.target.value)}
                                    style={{ padding: '0.5rem', marginRight: '0.5rem' }}
                                />
                                <button onClick={saveEdit} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem', cursor: 'pointer' }}>
                                    Guardar
                                </button>
                                <button
                                    onClick={() => {
                                        setEditId(null)
                                        setEditNombre('')
                                    }}
                                    style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                                >
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <>
                                <span style={{ marginRight: 12, fontWeight: 'bold' }}>{r.nombre}</span>
                                <button
                                    onClick={() => startEdit(r)}
                                    style={{ padding: '0.5rem 1rem', marginRight: '0.5rem', cursor: 'pointer' }}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => removeRole(r.id)}
                                    style={{ padding: '0.5rem 1rem', color: 'white', backgroundColor: '#d9534f', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                                >
                                    Eliminar
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}