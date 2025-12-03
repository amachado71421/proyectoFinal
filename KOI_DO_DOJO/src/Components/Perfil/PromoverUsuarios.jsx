import React, { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const USERS_ENDPOINT = `${API_URL}/api/perfiles/`
const PROMOTE_ENDPOINT = `${API_URL}/api/auth/promote-user/`

export default function PromoverUsuarios() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [actionLoadingId, setActionLoadingId] = useState(null)
    const [error, setError] = useState('')
    const [noAuth, setNoAuth] = useState(false)

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            setError('')
            setNoAuth(false)

            try {
                const res = await fetch(USERS_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (res.status === 401) {
                    setError('Sesión expirada. Por favor, inicia sesión de nuevo.')
                    setNoAuth(true)
                    setLoading(false)
                    return
                }

                if (!res.ok) throw new Error(`HTTP ${res.status}`)

                const data = await res.json()
                const normalized = Array.isArray(data) ? data : data.results || []

                setUsers(
                    normalized.map(u => ({
                        id: u.id_perfil || u.id,
                        username: u.username,
                        email: u.email,
                        is_staff: !!u.is_staff,
                        is_superuser: !!u.is_superuser
                    }))
                )
            } catch (err) {
                console.error('Error al cargar usuarios:', err)
                setError('No se pudieron cargar usuarios.')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    const getActionLabel = (changes) => {
        if ('is_staff' in changes) {
            return changes.is_staff ? 'Dar privilegios de staff' : 'Quitar privilegios de staff'
        }
        if ('is_superuser' in changes) {
            return changes.is_superuser ? 'Hacer superuser (administrador)' : 'Quitar superuser (administrador)'
        }
        return 'Cambiar privilegios'
    }

    const promote = async (id, changes) => {
        const actionLabel = getActionLabel(changes)
        if (!window.confirm(`¿Confirmar acción: ${actionLabel} para el usuario con ID ${id}?`)) return

        setActionLoadingId(id)
        setError('')

        try {
            const body = { id_perfil: id, ...changes }

            const res = await fetch(PROMOTE_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify(body)
            })

            const data = await res.json().catch(() => ({}))

            if (res.status === 401) {
                setError(`No tienes permisos para: ${actionLabel}. Solo administradores pueden hacerlo.`)
                setNoAuth(true)
                return
            }

            if (!res.ok) {
                setError(data.detail || data.error || `Error al realizar: ${actionLabel}.`)
                return
            }

            setUsers(prev =>
                prev.map(u =>
                    u.id === id
                        ? {
                            ...u,
                            is_staff: data.is_staff !== undefined ? !!data.is_staff : u.is_staff,
                            is_superuser: data.is_superuser !== undefined ? !!data.is_superuser : u.is_superuser
                        }
                        : u
                )
            )
        } catch (err) {
            console.error('Error de conexión:', err)
            setError(`Error de conexión al intentar: ${actionLabel}. Intenta de nuevo.`)
        } finally {
            setActionLoadingId(null)
        }
    }

    if (noAuth) {
        return (
            <div style={{ padding: '1rem', backgroundColor: '#fee', borderRadius: 4 }}>
                <p style={{ color: '#c00' }}>{error}</p>
                <button onClick={() => window.location.href = '/login'}>Ir a Login</button>
            </div>
        )
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Promover / Demover Usuarios</h2>

            {error && <div style={{ color: 'red', marginBottom: 12, padding: 8, backgroundColor: '#fee', borderRadius: 4 }}>{error}</div>}

            {loading && <div style={{ color: '#666' }}>Cargando usuarios...</div>}

            {!loading && users.length === 0 && <div style={{ color: '#666' }}>No hay usuarios.</div>}

            {users.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                            <th style={{ textAlign: 'left', padding: 8 }}>Usuario</th>
                            <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
                            <th style={{ textAlign: 'center', padding: 8 }}>Staff</th>
                            <th style={{ textAlign: 'center', padding: 8 }}>Administrador</th>
                            <th style={{ textAlign: 'center', padding: 8 }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: 8 }}>{u.username}</td>
                                <td style={{ padding: 8 }}>{u.email}</td>
                                <td style={{ textAlign: 'center', padding: 8 }}>{u.is_staff ? 'Sí' : 'No'}</td>
                                <td style={{ textAlign: 'center', padding: 8 }}>{u.is_superuser ? 'Sí' : 'No'}</td>
                                <td style={{ textAlign: 'center', padding: 8 }}>
                                    <button
                                        disabled={actionLoadingId === u.id || loading}
                                        onClick={() => promote(u.id, { is_staff: true })}
                                        style={{ padding: '4px 8px', marginRight: 4, cursor: 'pointer' }}
                                    >
                                        Dar privilegios (staff)
                                    </button>
                                    <button
                                        disabled={actionLoadingId === u.id || loading}
                                        onClick={() => promote(u.id, { is_staff: false })}
                                        style={{ padding: '4px 8px', marginRight: 4, cursor: 'pointer' }}
                                    >
                                        Quitar privilegios (staff)
                                    </button>
                                    <button
                                        disabled={actionLoadingId === u.id || loading}
                                        onClick={() => promote(u.id, { is_superuser: true })}
                                        style={{ padding: '4px 8px', marginRight: 4, cursor: 'pointer' }}
                                    >
                                        Hacer administrador
                                    </button>
                                    <button
                                        disabled={actionLoadingId === u.id || loading}
                                        onClick={() => promote(u.id, { is_superuser: false })}
                                        style={{ padding: '4px 8px', cursor: 'pointer' }}
                                    >
                                        Quitar administrador
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}