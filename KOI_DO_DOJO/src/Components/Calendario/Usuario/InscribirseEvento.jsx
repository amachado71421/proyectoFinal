import React, { useEffect, useState } from 'react'
import '/src/Styles/GestionEventos.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`
const PERFIL_EVENTO_ENDPOINT = `${API_URL}/api/perfil-evento/`
const ME_ENDPOINT = `${API_URL}/api/auth/me/`
const ESTADO_ENDPOINT = `${API_URL}/api/estado/`
const ROLES_ENDPOINT = `${API_URL}/api/roles/`

export default function InscribirseEvento() {
    const [user, setUser] = useState(null)
    const [eventos, setEventos] = useState([])
    const [inscripciones, setInscripciones] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        return null
    }

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        return headers
    }

    useEffect(() => {
        let mounted = true
        const init = async () => {
            setLoading(true)
            setError('')
            try {
                // 1) obtener usuario actual
                const meRes = await fetch(ME_ENDPOINT, { method: 'GET', credentials: 'include', headers: getAuthHeaders(false) })
                if (!meRes.ok) throw new Error('No autenticado')
                const meData = await meRes.json()
                if (!mounted) return
                setUser(meData)

                // 2) obtener eventos
                const evRes = await fetch(EVENTOS_ENDPOINT, { method: 'GET', credentials: 'include', headers: getAuthHeaders(false) })
                if (!evRes.ok) throw new Error('No se pudieron cargar eventos')
                const evData = await evRes.json()
                const evList = Array.isArray(evData) ? evData : evData.results || []
                if (!mounted) return
                setEventos(evList)

                // 3) obtener inscripciones existentes
                const peRes = await fetch(PERFIL_EVENTO_ENDPOINT, { method: 'GET', credentials: 'include', headers: getAuthHeaders(false) })
                if (!peRes.ok) throw new Error('No se pudieron cargar inscripciones')
                const peData = await peRes.json()
                const peList = Array.isArray(peData) ? peData : peData.results || []
                if (!mounted) return
                setInscripciones(peList.filter(i => {
                    const uid = meData.id_perfil ?? meData.id
                    const pid = i.id_perfil?.id_perfil ?? i.id_perfil ?? i.idPerfil ?? i.id_perfil
                    return pid === uid
                }))

            } catch (err) {
                console.error('Error inicializando inscripciones:', err)
                if (err.message === 'No autenticado') setError('Debes iniciar sesión para inscribirte en eventos.')
                else setError('Error cargando datos. Intenta de nuevo más tarde.')
            } finally {
                if (mounted) setLoading(false)
            }
        }

        init()
        return () => { mounted = false }
    }, [])

    const isInscrito = (evento) => {
        const eid = evento.id_evento ?? evento.id
        return inscripciones.some(i => (i.id_evento?.id_evento ?? i.id_evento ?? i.idEvento ?? i.id_evento) === eid)
    }

    const handleInscribirse = async (evento) => {
        if (!user) {
            setError('Debes iniciar sesión para inscribirte.')
            return
        }
        setLoading(true); setError('')
        try {
            // intentar elegir un estado y rol por defecto consultando el backend
            let estadoId = null
            try {
                const esRes = await fetch(ESTADO_ENDPOINT, { method: 'GET', credentials: 'include', headers: getAuthHeaders(false) })
                if (esRes.ok) {
                    const esData = await esRes.json()
                    const list = Array.isArray(esData) ? esData : esData.results || []
                    // buscar un estado que parezca 'Inscrito' o 'Registrado'
                    const found = list.find(e => ['Inscrito', 'Inscripción', 'Registrado', 'Registrado'].includes(e.nombre_estado))
                    estadoId = found ? (found.id_estado ?? found.id) : (list[0] ? (list[0].id_estado ?? list[0].id) : null)
                }
            } catch (e) { console.warn('No se pudo obtener estados', e) }

            let rolId = null
            try {
                const rRes = await fetch(ROLES_ENDPOINT, { method: 'GET', credentials: 'include', headers: getAuthHeaders(false) })
                if (rRes.ok) {
                    const rData = await rRes.json()
                    const list = Array.isArray(rData) ? rData : rData.results || []
                    const found = list.find(r => ['Participante', 'Usuario', 'Participante'].includes(r.nombre_rol))
                    rolId = found ? (found.id_rol ?? found.id) : (list[0] ? (list[0].id_rol ?? list[0].id) : null)
                }
            } catch (e) { console.warn('No se pudo obtener roles', e) }

            const payload = {
                id_perfil: user.id_perfil ?? user.id,
                id_evento: evento.id_evento ?? evento.id,
                id_estado: estadoId,
                id_rol: rolId
            }

            const headers = getAuthHeaders(true)
            const csrftoken = getCookie('csrftoken')
            if (csrftoken) headers['X-CSRFToken'] = csrftoken

            const res = await fetch(PERFIL_EVENTO_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers,
                body: JSON.stringify(payload)
            })

            if (!res.ok) {
                const text = await res.text().catch(() => '')
                throw new Error(text || `HTTP ${res.status}`)
            }

            const created = await res.json().catch(() => ({}))
            setInscripciones(prev => [...prev, created])
        } catch (err) {
            console.error('Error inscribiendo:', err)
            setError('No se pudo inscribir al evento. Intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    const handleCancelarInscripcion = async (evento) => {
        if (!user) { setError('Debes iniciar sesión.'); return }
        setLoading(true); setError('')
        try {
            const eid = evento.id_evento ?? evento.id
            // buscar la inscripción correspondiente
            const ins = inscripciones.find(i => (i.id_evento?.id_evento ?? i.id_evento ?? i.idEvento ?? i.id_evento) === eid)
            if (!ins) { setError('Inscripción no encontrada'); return }

            // PerfilEvento tiene composite PK, pero DRF created entries likely return the object; we'll attempt to delete by querying its id fields
            // Construir url para eliminar: /api/perfil-evento/{id_perfil}/{id_evento}/ no disponible -> usar DELETE con cuerpo no estándar

            // Intentamos eliminar usando el endpoint de lista filtrando (si el backend permite DELETE directo en /api/perfil-evento/{pk}/, pk no existe)
            // En su lugar, hacemos una petición DELETE al recurso específico si la respuesta original incluyó una URL
            if (ins.url) {
                const del = await fetch(ins.url, { method: 'DELETE', credentials: 'include', headers: getAuthHeaders(false) })
                if (!del.ok) throw new Error('No se pudo cancelar')
            } else {
                // Como fallback, pedir al backend eliminar usando query: buscar el id en la lista y usar su índice (no ideal)
                // Mejor: llamar a la lista con filtros para obtener el PK y luego eliminar.
                // Llamamos al endpoint con filtros
                const uid = user.id_perfil ?? user.id
                const qRes = await fetch(`${PERFIL_EVENTO_ENDPOINT}?id_perfil=${uid}&id_evento=${eid}`, { method: 'GET', credentials: 'include', headers: getAuthHeaders(false) })
                if (!qRes.ok) throw new Error('No se pudo confirmar inscripción')
                const qData = await qRes.json()
                const list = Array.isArray(qData) ? qData : qData.results || []
                const target = list[0]
                if (!target) throw new Error('Inscripción no encontrada para eliminar')
                // intentar eliminar por id compuesto: construir url con indices si existe 'id' en target
                const pk = target.id || null
                if (pk) {
                    const delRes = await fetch(`${PERFIL_EVENTO_ENDPOINT}${pk}/`, { method: 'DELETE', credentials: 'include', headers: getAuthHeaders(false) })
                    if (!delRes.ok) throw new Error('No se pudo cancelar inscripción')
                } else {
                    // No hay pk; intentar DELETE con cuerpo (DRF no permite por defecto)
                    throw new Error('No es posible eliminar esta inscripción desde el cliente')
                }
            }

            setInscripciones(prev => prev.filter(i => (i.id_evento?.id_evento ?? i.id_evento ?? i.idEvento ?? i.id_evento) !== eid))
        } catch (err) {
            console.error('Error cancelando inscripción:', err)
            setError('No se pudo cancelar la inscripción.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="gestion-eventos-container">
            <h1 className="gestion-title">Inscribirse a Eventos</h1>

            {error && <div className="error-banner">{error}</div>}

            {loading && <p className="loading-text">Cargando...</p>}

            {!loading && eventos.length === 0 && <p className="no-events-text">No hay eventos disponibles.</p>}

            <div className="eventos-grid">
                {eventos.map(ev => (
                    <div key={ev.id_evento ?? ev.id} className="evento-card">
                        <div className="evento-header">
                            <h3 className="evento-title">{ev.nombre_evento ?? ev.title}</h3>
                            <div className="evento-actions">
                                {isInscrito(ev) ? (
                                    <button className="btn-delete" onClick={() => handleCancelarInscripcion(ev)}>Cancelar</button>
                                ) : (
                                    <button className="btn-submit" onClick={() => handleInscribirse(ev)}>Inscribirse</button>
                                )}
                            </div>
                        </div>

                        {ev.descripcion_evento && <p className="evento-description">{ev.descripcion_evento}</p>}

                        <div className="evento-details">
                            {ev.fecha_inicio && (
                                <div className="detail-row">
                                    <span className="detail-label">Inicio:</span>
                                    <span className="detail-value">{ev.fecha_inicio}{ev.hora_inicio ? ` ${ev.hora_inicio}` : ''}</span>
                                </div>
                            )}

                            {ev.fecha_final && (
                                <div className="detail-row">
                                    <span className="detail-label">Fin:</span>
                                    <span className="detail-value">{ev.fecha_final}{ev.hora_final ? ` ${ev.hora_final}` : ''}</span>
                                </div>
                            )}

                            {ev.lugar && (
                                <div className="detail-row">
                                    <span className="detail-label">Lugar:</span>
                                    <span className="detail-value">{ev.lugar}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
