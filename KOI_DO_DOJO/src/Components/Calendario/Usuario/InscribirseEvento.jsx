import React, { useEffect, useState } from 'react';
import AdministrarEstados from '../AdministrarEstados.jsx';
import '/src/Styles/GestionEventos.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`;
const PERFIL_EVENTO_ENDPOINT = `${API_URL}/api/perfil-evento/`;
const PERFIL_EVENTO_CANCELAR = `${PERFIL_EVENTO_ENDPOINT}cancelar/`;
const ME_ENDPOINT = `${API_URL}/api/auth/me/`;
const ESTADO_ENDPOINT = `${API_URL}/api/estados/`;

export default function InscribirseEvento() {
    const [user, setUser] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [inscripciones, setInscripciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    const getAuthHeaders = (json = true) => {
        const headers = {};
        if (json) headers['Content-Type'] = 'application/json';
        return headers;
    };

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            setLoading(true);
            setError('');
            try {
                // Obtener usuario
                const meRes = await fetch(ME_ENDPOINT, { credentials: 'include', headers: getAuthHeaders(false) });
                if (!meRes.ok) throw new Error('No autenticado');
                const meData = await meRes.json();
                if (!mounted) return;
                setUser(meData);

                // Obtener eventos
                const evRes = await fetch(EVENTOS_ENDPOINT, { credentials: 'include', headers: getAuthHeaders(false) });
                if (!evRes.ok) throw new Error('No se pudieron cargar eventos');
                const evData = await evRes.json();
                const evList = Array.isArray(evData) ? evData : evData.results || [];
                if (!mounted) return;
                setEventos(evList);

                // Obtener inscripciones
                const peRes = await fetch(PERFIL_EVENTO_ENDPOINT, { credentials: 'include', headers: getAuthHeaders(false) });
                if (!peRes.ok) throw new Error('No se pudieron cargar inscripciones');
                const peData = await peRes.json();
                const peList = Array.isArray(peData) ? peData : peData.results || [];

                const uid = meData.id_perfil ?? meData.id;
                if (!mounted) return;
                setInscripciones(peList.filter(i => i.id_perfil === uid));

            } catch (err) {
                console.error(err);
                if (err.message === 'No autenticado') setError('Debes iniciar sesión para inscribirte.');
                else setError('Error cargando datos.');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        init();
        return () => { mounted = false; };
    }, []);

    const isInscrito = (evento) => {
        const eid = evento.id_evento ?? evento.id;
        return inscripciones.some(i => i.id_evento === eid);
    };

    const handleInscribirse = async (evento) => {
        if (!user) { setError('Debes iniciar sesión'); return; }
        setLoading(true);
        setError('');

        try {
            // Obtener estado "Inscrito"
            let estadoId = null;
            try {
                const esRes = await fetch(ESTADO_ENDPOINT, { credentials: 'include', headers: getAuthHeaders(false) });
                if (esRes.ok) {
                    const esData = await esRes.json();
                    const list = Array.isArray(esData) ? esData : esData.results || [];
                    const found = list.find(e => ['inscrito'].includes(e.nombre_estado.toLowerCase()));
                    estadoId = found?.id_estado ?? found?.id ?? null;
                }
            } catch (e) { console.warn(e); }

            if (!estadoId) throw new Error('No se pudo determinar el estado de inscripción');

            const payload = {
                id_perfil: user.id_perfil ?? user.id,
                id_evento: evento.id_evento ?? evento.id,
                id_estado: estadoId,
                id_rol: 3
            };

            const headers = getAuthHeaders(true);
            const csrftoken = getCookie('csrftoken');
            if (csrftoken) headers['X-CSRFToken'] = csrftoken;

            const res = await fetch(PERFIL_EVENTO_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers,
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text().catch(() => '');
                throw new Error(text || `HTTP ${res.status}`);
            }

            const created = await res.json();

            setInscripciones(prev => [
                ...prev,
                {
                    id_perfil: created.id_perfil,
                    id_evento: created.id_evento,
                    id_estado: created.id_estado,
                    id_rol: created.id_rol ?? null
                }
            ]);

        } catch (err) {
            console.error(err);
            setError('No se pudo inscribir al evento. Revisa los datos.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelarInscripcion = async (evento) => {
        if (!user) { setError('Debes iniciar sesión'); return; }
        setLoading(true);
        setError('');

        try {
            const uid = user.id_perfil ?? user.id;
            const eid = evento.id_evento ?? evento.id;

            const delRes = await fetch(`${PERFIL_EVENTO_CANCELAR}?id_perfil=${uid}&id_evento=${eid}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!delRes.ok) {
                const text = await delRes.text().catch(() => '');
                throw new Error(text || `HTTP ${delRes.status}`);
            }

            setInscripciones(prev => prev.filter(i => i.id_evento !== eid));

        } catch (err) {
            console.error(err);
            setError('No se pudo cancelar la inscripción.');
        } finally {
            setLoading(false);
        }
    };

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
                                {isInscrito(ev)
                                    ? <button className="btn-delete" onClick={() => handleCancelarInscripcion(ev)}>Cancelar</button>
                                    : <button className="btn-submit" onClick={() => handleInscribirse(ev)}>Inscribirse</button>
                                }
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

            <div style={{ marginTop: '50px' }}>
                <AdministrarEstados />
            </div>
        </div>
    );
}
