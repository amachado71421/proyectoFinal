import React, { useState, useEffect } from 'react'
import '/src/Styles/CrearRoles.css'

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
        <div className="roles-container">
            <h2 className="roles-title">Gestionar Roles</h2>

            {error && <div className="roles-error">{error}</div>}

            <div className="roles-form">
                <input
                    type="text"
                    placeholder="Nombre del rol"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="roles-input"
                />
                <button 
                    onClick={handleAdd} 
                    disabled={loading} 
                    className="roles-button roles-button-create"
                >
                    Crear
                </button>
            </div>

            {loading && <div className="roles-loading">Cargando...</div>}

            <ul className="roles-list">
                {roles.map(r => (
                    <li key={r.id} className="roles-item">
                        {editId === r.id ? (
                            <>
                                <input
                                    value={editNombre}
                                    onChange={e => setEditNombre(e.target.value)}
                                    className="roles-input"
                                />
                                <button 
                                    onClick={saveEdit} 
                                    className="roles-button roles-button-save"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => {
                                        setEditId(null)
                                        setEditNombre('')
                                    }}
                                    className="roles-button roles-button-cancel"
                                >
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="roles-name">{r.nombre}</span>
                                <button
                                    onClick={() => startEdit(r)}
                                    className="roles-button roles-button-edit"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => removeRole(r.id)}
                                    className="roles-button roles-button-delete"
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
