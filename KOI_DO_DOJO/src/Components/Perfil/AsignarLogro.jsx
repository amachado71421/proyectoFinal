import React, { useState, useEffect } from 'react'
import '/src/Styles/AsignarLogro.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const PERFILES_ENDPOINT = `${API_URL}/api/perfiles/`
const LOGROS_ENDPOINT = `${API_URL}/api/logros/`
const PERFIL_LOGRO_ENDPOINT = `${API_URL}/api/perfil-logros/`

export default function AsignarLogro() {
    const [perfiles, setPerfiles] = useState([])
    const [logros, setLogros] = useState([])
    const [asignaciones, setAsignaciones] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [savingAssignmentId, setSavingAssignmentId] = useState(null)

    const [formData, setFormData] = useState({
        id_perfil: '',
        id_logro: '',
        fecha_asignacion: new Date().toISOString().split('T')[0],
        comentarios_logro: ''
    })
    const [submitting, setSubmitting] = useState(false)

    // Leer cookie CSRF
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'))
        return match ? decodeURIComponent(match[2]) : null
    }

    // Headers con CSRF token
    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        const csrf = getCookie('csrftoken')
        if (csrf) headers['X-CSRFToken'] = csrf
        return headers
    }

    // Cargar perfiles, logros y asignaciones al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError('')

            try {
                // Cargar perfiles
                const resPerfiles = await fetch(PERFILES_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })
                if (!resPerfiles.ok) throw new Error(`Error cargando perfiles: HTTP ${resPerfiles.status}`)
                const dataPerfiles = await resPerfiles.json()
                const normalizedPerfiles = Array.isArray(dataPerfiles) ? dataPerfiles : dataPerfiles.results || []
                setPerfiles(
                    normalizedPerfiles.map(p => ({
                        id: p.id_perfil || p.id,
                        username: p.username,
                        nombre_completo: `${p.first_name} ${p.last_name}`.trim() || p.username
                    }))
                )

                // Cargar logros
                const resLogros = await fetch(LOGROS_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })
                if (!resLogros.ok) throw new Error(`Error cargando logros: HTTP ${resLogros.status}`)
                const dataLogros = await resLogros.json()
                const normalizedLogros = Array.isArray(dataLogros) ? dataLogros : dataLogros.results || []
                setLogros(
                    normalizedLogros.map(l => ({
                        id: l.id_logro || l.id,
                        nombre: l.nombre_logro || l.nombre,
                        descripcion: l.descripcion_logro || l.descripcion || ''
                    }))
                )

                // Cargar asignaciones existentes
                const resAsignaciones = await fetch(PERFIL_LOGRO_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                })
                if (!resAsignaciones.ok) throw new Error(`Error cargando asignaciones: HTTP ${resAsignaciones.status}`)
                const dataAsignaciones = await resAsignaciones.json()
                const normalizedAsignaciones = Array.isArray(dataAsignaciones) ? dataAsignaciones : dataAsignaciones.results || []
                setAsignaciones(
                    normalizedAsignaciones.map(a => ({
                        id_perfil: a.id_perfil,
                        id_logro: a.id_logro,
                        fecha_asignacion: a.fecha_asignacion,
                        comentarios_logro: a.comentarios_logro || ''
                    }))
                )
            } catch (err) {
                console.error('Error cargando datos:', err)
                setError('Error al cargar datos necesarios.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.id_perfil || !formData.id_logro) {
            setError('Debes seleccionar un usuario y un logro.')
            return
        }

        // Validar que no exista ya esta asignación
        const existe = asignaciones.some(
            a => a.id_perfil === parseInt(formData.id_perfil) && a.id_logro === parseInt(formData.id_logro)
        )
        if (existe) {
            setError('Este logro ya está asignado a este usuario.')
            return
        }

        setSubmitting(true)
        setError('')

        try {
            const body = {
                id_perfil: parseInt(formData.id_perfil),
                id_logro: parseInt(formData.id_logro),
                fecha_asignacion: formData.fecha_asignacion,
                comentarios_logro: formData.comentarios_logro.trim()
            }

            const res = await fetch(PERFIL_LOGRO_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify(body)
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                setError(data.detail || JSON.stringify(data) || 'Error al asignar logro.')
                return
            }

            // Añadir nueva asignación a la lista
            setAsignaciones(prev => [
                ...prev,
                {
                    id_perfil: body.id_perfil,
                    id_logro: body.id_logro,
                    fecha_asignacion: body.fecha_asignacion,
                    comentarios_logro: body.comentarios_logro
                }
            ])

            // Limpiar formulario
            setFormData({
                id_perfil: '',
                id_logro: '',
                fecha_asignacion: new Date().toISOString().split('T')[0],
                comentarios_logro: ''
            })
        } catch (err) {
            console.error('Error al asignar logro:', err)
            setError('Error de conexión al asignar logro.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteAsignment = async (idPerfil, idLogro) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta asignación?')) return

        setSavingAssignmentId(`${idPerfil}-${idLogro}`)
        setError('')

        try {
            // Encontrar el objeto de asignación para obtener su ID si es necesario
            // Nota: si PerfilLogro tiene un id propio, usa la ruta directa
            // Si no, usa una ruta custom o un query param
            const res = await fetch(`${PERFIL_LOGRO_ENDPOINT}?id_perfil=${idPerfil}&id_logro=${idLogro}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })

            if (res.status === 204 || res.ok) {
                setAsignaciones(prev =>
                    prev.filter(a => !(a.id_perfil === idPerfil && a.id_logro === idLogro))
                )
            } else {
                const data = await res.json().catch(() => ({}))
                setError(data.detail || 'Error al eliminar asignación.')
            }
        } catch (err) {
            console.error('Error al eliminar asignación:', err)
            setError('Error de conexión al eliminar asignación.')
        } finally {
            setSavingAssignmentId(null)
        }
    }

    const getPerfilName = (idPerfil) => {
        const perfil = perfiles.find(p => p.id === idPerfil)
        return perfil ? perfil.nombre_completo : `Perfil ${idPerfil}`
    }

    const getLogroName = (idLogro) => {
        const logro = logros.find(l => l.id === idLogro)
        return logro ? logro.nombre : `Logro ${idLogro}`
    }

    if (loading) return <div>Cargando datos...</div>

    return (
        <div className="asignar-logro-container">
            <h2>Asignar Logros a Usuarios</h2>

            {error && (
                <div style={{
                    color: 'red',
                    marginBottom: 12,
                    padding: 8,
                    backgroundColor: '#fee',
                    borderRadius: 4
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="asignar-logro-form">
                <h3>Nueva asignación</h3>

                <div className="form-group">
                    <label htmlFor="id_perfil">Usuario *</label>
                    <select
                        id="id_perfil"
                        name="id_perfil"
                        value={formData.id_perfil}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- Selecciona un usuario --</option>
                        {perfiles.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.nombre_completo} (@{p.username})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="id_logro">Logro *</label>
                    <select
                        id="id_logro"
                        name="id_logro"
                        value={formData.id_logro}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- Selecciona un logro --</option>
                        {logros.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fecha_asignacion">Fecha de asignación</label>
                    <input
                        id="fecha_asignacion"
                        type="date"
                        name="fecha_asignacion"
                        value={formData.fecha_asignacion}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="comentarios_logro">Comentarios</label>
                    <textarea
                        id="comentarios_logro"
                        name="comentarios_logro"
                        placeholder="Observaciones o detalles de la asignación (opcional)"
                        value={formData.comentarios_logro}
                        onChange={handleChange}
                        className="form-textarea"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={submitting}
                >
                    {submitting ? 'Asignando...' : 'Asignar logro'}
                </button>
            </form>

            <div className="asignaciones-list">
                <h3>Logros asignados ({asignaciones.length})</h3>

                {asignaciones.length === 0 ? (
                    <div style={{ color: '#666' }}>No hay asignaciones aún.</div>
                ) : (
                    <div className="asignaciones-table-container">
                        <table className="asignaciones-table">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Logro</th>
                                    <th>Fecha</th>
                                    <th>Comentarios</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asignaciones.map((asignacion, idx) => (
                                    <tr key={`${asignacion.id_perfil}-${asignacion.id_logro}`}>
                                        <td>{getPerfilName(asignacion.id_perfil)}</td>
                                        <td>{getLogroName(asignacion.id_logro)}</td>
                                        <td>{new Date(asignacion.fecha_asignacion).toLocaleDateString('es-ES')}</td>
                                        <td>{asignacion.comentarios_logro || '—'}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteAsignment(asignacion.id_perfil, asignacion.id_logro)}
                                                disabled={savingAssignmentId === `${asignacion.id_perfil}-${asignacion.id_logro}`}
                                                className="delete-btn"
                                                title="Eliminar asignación"
                                            >
                                                {savingAssignmentId === `${asignacion.id_perfil}-${asignacion.id_logro}` ? '...' : '❌'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}