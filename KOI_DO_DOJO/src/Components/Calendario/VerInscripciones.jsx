import React, { useEffect, useState } from 'react'
import '/src/Styles/GestionEventos.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`
const PERFIL_EVENTO_ENDPOINT = `${API_URL}/api/perfil-evento/`
const PERFILES_ENDPOINT = `${API_URL}/api/perfiles/`

export default function VerInscripciones({ refreshTrigger }) {
    const [eventos, setEventos] = useState([])
    const [inscripciones, setInscripciones] = useState([])
    const [perfiles, setPerfiles] = useState({})
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

    // Cargar datos cuando cambia refreshTrigger
    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTrigger])

    const loadData = async () => {
        setLoading(true)
        setError('')
        try {
            // 1) Cargar eventos
            const evRes = await fetch(EVENTOS_ENDPOINT, {
                method: 'GET',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })
            if (!evRes.ok) throw new Error('No se pudieron cargar eventos')
            const evData = await evRes.json()
            const evList = Array.isArray(evData) ? evData : evData.results || []
            setEventos(evList)

            // 2) Cargar inscripciones
            const insRes = await fetch(PERFIL_EVENTO_ENDPOINT, {
                method: 'GET',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })
            if (!insRes.ok) throw new Error('No se pudieron cargar inscripciones')
            const insData = await insRes.json()
            const insList = Array.isArray(insData) ? insData : insData.results || []
            setInscripciones(insList)

            // 3) Cargar perfiles para mostrar nombres
            const pRes = await fetch(PERFILES_ENDPOINT, {
                method: 'GET',
                credentials: 'include',
                headers: getAuthHeaders(false)
            })
            if (!pRes.ok) throw new Error('No se pudieron cargar perfiles')
            const pData = await pRes.json()
            const pList = Array.isArray(pData) ? pData : pData.results || []
            const perfilesMap = {}
            pList.forEach(p => {
                const id = p.id_perfil ?? p.id
                perfilesMap[id] = p
            })
            setPerfiles(perfilesMap)
        } catch (err) {
            console.error('Error cargando datos de inscripciones:', err)
            setError('Error cargando inscripciones.')
        } finally {
            setLoading(false)
        }
    }

    const getEventoInscripciones = (eventoId) => {
        return inscripciones.filter(i => {
            const eid = i.id_evento?.id_evento ?? i.id_evento ?? i.idEvento ?? null
            return eid === eventoId
        })
    }

    const handleEliminarParticipante = async (inscripcionId, eventoId) => {
        if (!window.confirm('¿Eliminar este participante?')) return

        setLoading(true)
        try {
            const headers = getAuthHeaders(true)
            const csrftoken = getCookie('csrftoken')
            if (csrftoken) headers['X-CSRFToken'] = csrftoken

            const res = await fetch(`${PERFIL_EVENTO_ENDPOINT}${inscripcionId}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers
            })

            if (!res.ok) {
                // Si el ID directo no funciona, intentar filtrar y eliminar
                const uid = inscripciones.find(i => i.id_perfil?.id_perfil ?? i.id_perfil)?.id_perfil
                if (uid) {
                    const qRes = await fetch(`${PERFIL_EVENTO_ENDPOINT}?id_perfil=${uid}&id_evento=${eventoId}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: getAuthHeaders(false)
                    })
                    if (qRes.ok) {
                        const qData = await qRes.json()
                        const list = Array.isArray(qData) ? qData : qData.results || []
                        const target = list[0]
                        if (target && target.id) {
                            const delRes = await fetch(`${PERFIL_EVENTO_ENDPOINT}${target.id}/`, {
                                method: 'DELETE',
                                credentials: 'include',
                                headers: getAuthHeaders(false)
                            })
                            if (!delRes.ok) throw new Error('No se pudo eliminar')
                        } else throw new Error('No se encontró recurso para eliminar')
                    } else throw new Error('No se pudo confirmar inscripción')
                } else throw new Error('No se pudo eliminar')
            }

            setInscripciones(prev => prev.filter(i => {
                const iid = i.id || inscripcionId
                return iid !== inscripcionId
            }))
        } catch (err) {
            console.error('Error eliminando participante:', err)
            setError('Error al eliminar participante.')
        } finally {
            setLoading(false)
        }
    }

    const getNombreParticipante = (perfilId) => {
        const pid = perfilId?.id_perfil ?? perfilId
        const perfil = perfiles[pid]
        if (!perfil) return `Usuario ${pid}`
        return perfil.first_name && perfil.last_name
            ? `${perfil.first_name} ${perfil.last_name}`
            : perfil.username || `Usuario ${pid}`
    }

    return (
        <div style={{ marginTop: 30 }}>
            <h2 className="section-title">Inscripciones por Evento</h2>

            {error && <div className="error-banner">{error}</div>}

            {loading && <p className="loading-text">Cargando...</p>}

            {!loading && eventos.length === 0 && <p className="no-events-text">No hay eventos.</p>}

            {!loading && eventos.length > 0 && (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {eventos.map(ev => {
                        const participantes = getEventoInscripciones(ev.id_evento ?? ev.id)
                        return (
                            <div key={ev.id_evento ?? ev.id} style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '15px',
                                backgroundColor: '#f9f9f9'
                            }}>
                                <h3 style={{ marginTop: 0, color: '#333' }}>
                                    {ev.nombre_evento}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#666', margin: '5px 0' }}>
                                    {participantes.length} participante{participantes.length !== 1 ? 's' : ''} inscrito{participantes.length !== 1 ? 's' : ''}
                                </p>

                                {participantes.length === 0 ? (
                                    <p style={{ color: '#999', fontStyle: 'italic' }}>
                                        Sin participantes
                                    </p>
                                ) : (
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: '10px 0 0 0'
                                    }}>
                                        {participantes.map((ins, idx) => {
                                            const uid = ins.id_perfil?.id_perfil ?? ins.id_perfil
                                            return (
                                                <li key={idx} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    borderBottom: idx < participantes.length - 1 ? '1px solid #eee' : 'none',
                                                    backgroundColor: '#fff'
                                                }}>
                                                    <span>{getNombreParticipante(uid)}</span>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleEliminarParticipante(ins.id || idx, ev.id_evento ?? ev.id)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                                    >
                                                        🗑️
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
