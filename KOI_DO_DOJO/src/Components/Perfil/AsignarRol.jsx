import React, { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const USERS_ENDPOINT = `${API_URL}/api/perfiles/`
const ROLES_ENDPOINT = `${API_URL}/api/roles/`

export default function AsignarRol() {
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)
    const [actionLoadingId, setActionLoadingId] = useState(null)
    const [error, setError] = useState('')
    const [selectedRoles, setSelectedRoles] = useState({})

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
                // Cargar usuarios
                const usersRes = await fetch(USERS_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!usersRes.ok) throw new Error(`HTTP ${usersRes.status}`)

                const usersData = await usersRes.json()
                const normalized = Array.isArray(usersData) ? usersData : usersData.results || []

                setUsers(
                    normalized.map(u => ({
                        id: u.id_perfil || u.id,
                        username: u.username,
                        first_name: u.first_name || '',
                        last_name: u.last_name || '',
                        id_rol: u.id_rol || null
                    }))
                )

                // Cargar roles
                const rolesRes = await fetch(ROLES_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })

                if (!rolesRes.ok) throw new Error(`HTTP ${rolesRes.status}`)

                const rolesData = await rolesRes.json()
                const rolesNormalized = Array.isArray(rolesData) ? rolesData : rolesData.results || []

                setRoles(
                    rolesNormalized.map(r => ({
                        id: r.id_rol || r.id,
                        nombre: r.nombre_rol || r.nombre
                    }))
                )

                // Inicializar selectedRoles con los roles actuales
                const roleMap = {}
                normalized.forEach(u => {
                    roleMap[u.id_perfil || u.id] = u.id_rol || null
                })
                setSelectedRoles(roleMap)
            } catch (err) {
                console.error('Error al cargar datos:', err)
                setError('No se pudieron cargar usuarios o roles.')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    const handleRoleChange = (userId, roleId) => {
        setSelectedRoles(prev => ({
            ...prev,
            [userId]: roleId === '' ? null : parseInt(roleId)
        }))
    }

    const assignRole = async (userId) => {
        const roleId = selectedRoles[userId]
        if (roleId === null) {
            setError('Selecciona un rol primero.')
            return
        }

        setActionLoadingId(userId)
        setError('')

        try {
            const res = await fetch(`${USERS_ENDPOINT}${userId}/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ id_rol: roleId })
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                setError(data.detail || data.error || 'Error al asignar rol.')
                return
            }

            setUsers(prev =>
                prev.map(u =>
                    u.id === userId
                        ? { ...u, id_rol: roleId }
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

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Asignar Roles a Usuarios</h2>

            {error && <div style={{ color: 'red', marginBottom: 12, padding: 8, backgroundColor: '#fee', borderRadius: 4 }}>{error}</div>}

            {loading && <div style={{ color: '#666' }}>Cargando usuarios y roles...</div>}

            {!loading && users.length === 0 && <div style={{ color: '#666' }}>No hay usuarios.</div>}

            {users.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                            <th style={{ textAlign: 'left', padding: 8 }}>Usuario</th>
                            <th style={{ textAlign: 'left', padding: 8 }}>Nombre</th>
                            <th style={{ textAlign: 'left', padding: 8 }}>Apellido</th>
                            <th style={{ textAlign: 'center', padding: 8 }}>Rol Actual</th>
                            <th style={{ textAlign: 'center', padding: 8 }}>Asignar Rol</th>
                            <th style={{ textAlign: 'center', padding: 8 }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => {
                            const currentRol = roles.find(r => r.id === u.id_rol)
                            return (
                                <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: 8 }}>{u.username}</td>
                                    <td style={{ padding: 8 }}>{u.first_name || '-'}</td>
                                    <td style={{ padding: 8 }}>{u.last_name || '-'}</td>
                                    <td style={{ textAlign: 'center', padding: 8 }}>
                                        {currentRol ? currentRol.nombre : 'Sin rol'}
                                    </td>
                                    <td style={{ textAlign: 'center', padding: 8 }}>
                                        <select
                                            value={selectedRoles[u.id] || ''}
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            style={{ padding: '0.5rem', minWidth: '150px' }}
                                        >
                                            <option value="">-- Seleccionar rol --</option>
                                            {roles.map(r => (
                                                <option key={r.id} value={r.id}>
                                                    {r.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td style={{ textAlign: 'center', padding: 8 }}>
                                        <button
                                            disabled={actionLoadingId === u.id || loading}
                                            onClick={() => assignRole(u.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                cursor: 'pointer',
                                                backgroundColor: '#5cb85c',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: 4
                                            }}
                                        >
                                            Asignar
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}