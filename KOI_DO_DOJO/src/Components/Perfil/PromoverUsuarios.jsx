import React, { useEffect, useState } from 'react'
import '../../Styles/PromoverUsuario.css'

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

    const promote = async (id, changes) => {
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
                setError('No tienes permisos. Solo administradores pueden hacerlo.')
                setNoAuth(true)
                return
            }

            if (!res.ok) {
                setError(data.detail || data.error || 'Error al cambiar privilegios.')
                return
            }

            setUsers(prev =>
                prev.map(u =>
                    u.id === id
                        ? {
                              ...u,
                              is_staff:
                                  data.is_staff !== undefined
                                      ? !!data.is_staff
                                      : u.is_staff,
                              is_superuser:
                                  data.is_superuser !== undefined
                                      ? !!data.is_superuser
                                      : u.is_superuser
                          }
                        : u
                )
            )
        } catch (err) {
            console.error('Error de conexión:', err)
            setError('Error de conexión. Intenta de nuevo.')
        } finally {
            setActionLoadingId(null)
        }
    }

    if (noAuth) {
        return (
            <div className="promover-no-auth">
                <p>{error}</p>
                <button onClick={() => (window.location.href = '/login')}>
                    Ir a Login
                </button>
            </div>
        )
    }

    return (
        <div className="promover-container">
            <h2 className="promover-title">Promover / Demover Usuarios</h2>

            {error && <div className="promover-alert-error">{error}</div>}

            {loading && <div className="promover-loading">Cargando usuarios...</div>}

            {!loading && users.length === 0 && (
                <div className="promover-no-users">No hay usuarios.</div>
            )}

            {users.length > 0 && (
                <div className="promover-table-wrapper">
                    <table className="promover-table">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Staff</th>
                                <th>Administrador</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(u => {
                                const isActionLoading = actionLoadingId === u.id || loading
                                return (
                                    <tr key={u.id}>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                        <td className="center">{u.is_staff ? 'Sí' : 'No'}</td>
                                        <td className="center">{u.is_superuser ? 'Sí' : 'No'}</td>
                                        <td className="center">
                                            <button
                                                onClick={() =>
                                                    !isActionLoading &&
                                                    promote(u.id, { is_staff: !u.is_staff })
                                                }
                                                className={`promover-btn ${
                                                    u.is_staff ? 'btn-red' : 'btn-green'
                                                } ${isActionLoading ? 'disabled' : ''}`}
                                            >
                                                {isActionLoading
                                                    ? '...'
                                                    : u.is_staff
                                                    ? 'Quitar Staff'
                                                    : 'Agregar Staff'}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    !isActionLoading &&
                                                    promote(u.id, {
                                                        is_superuser: !u.is_superuser
                                                    })
                                                }
                                                className={`promover-btn ${
                                                    u.is_superuser ? 'btn-red' : 'btn-green'
                                                } ${isActionLoading ? 'disabled' : ''}`}
                                            >
                                                {isActionLoading
                                                    ? '...'
                                                    : u.is_superuser
                                                    ? 'Quitar Admin'
                                                    : 'Agregar Admin'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
