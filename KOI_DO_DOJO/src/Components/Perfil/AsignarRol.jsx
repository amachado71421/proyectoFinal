import React, { useState, useEffect } from 'react'
import '../../Styles/AsignarRol.css';


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
        <div className="asignar-rol-container">
            <h2 className="asignar-rol-title">Asignar Roles a Usuarios</h2>

            {error && <div className="asignar-rol-error">{error}</div>}

            {loading && <div className="asignar-rol-loading">Cargando usuarios y roles...</div>}

            {!loading && users.length === 0 && <div className="asignar-rol-empty">No hay usuarios.</div>}

            {users.length > 0 && (
                <div className="asignar-rol-table-container">
                    <table className="asignar-rol-table">
                        <thead>
                            <tr>
                                <th className="col-usuario">Usuario</th>
                                <th className="col-nombre responsive-hide">Nombre</th>
                                <th className="col-apellido responsive-hide">Apellido</th>
                                <th className="col-rol-actual">Rol Actual</th>
                                <th className="col-asignar">Asignar Rol</th>
                                <th className="col-acciones">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => {
                                const currentRol = roles.find(r => r.id === u.id_rol)
                                return (
                                    <tr key={u.id}>
                                        <td className="col-usuario">{u.username}</td>
                                        <td className="col-nombre responsive-hide">{u.first_name || '-'}</td>
                                        <td className="col-apellido responsive-hide">{u.last_name || '-'}</td>
                                        <td className="col-rol-actual">
                                            {currentRol ? currentRol.nombre : 'Sin rol'}
                                        </td>
                                        <td className="col-asignar">
                                            <select
                                                value={selectedRoles[u.id] || ''}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                className="asignar-rol-select"
                                            >
                                                <option value="">-- Seleccionar rol --</option>
                                                {roles.map(r => (
                                                    <option key={r.id} value={r.id}>
                                                        {r.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="col-acciones">
                                            <button
                                                disabled={actionLoadingId === u.id || loading}
                                                onClick={() => assignRole(u.id)}
                                                className="asignar-rol-button"
                                            >
                                                Asignar
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
