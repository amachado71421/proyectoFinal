import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdministrarEstados from '../AdministrarEstados.jsx';
import { AuthContext } from '../../../../Context/AuthContext';
import '/src/Styles/GestionEventos.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const EVENTOS_ENDPOINT = `${API_URL}/api/eventos/`;
const PERFIL_EVENTO_ENDPOINT = `${API_URL}/api/perfil-evento/`;
const PERFIL_EVENTO_CANCELAR = `${PERFIL_EVENTO_ENDPOINT}cancelar/`;
const ME_ENDPOINT = `${API_URL}/api/auth/me/`;
const ESTADO_ENDPOINT = `${API_URL}/api/estados/`;

export default function InscribirseEvento() {
    const navigate = useNavigate();
    const { user: contextUser, userLoading } = useContext(AuthContext);

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
                // Usa AuthContext si ya tiene el usuario
                const meData = contextUser || await fetch(ME_ENDPOINT, {
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                }).then(res => {
                    if (!res.ok) throw new Error('No autenticado');
                    return res.json();
                });

                if (!mounted) return;
                setUser(meData);

                const evData = await fetch(EVENTOS_ENDPOINT, {
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                }).then(res => {
                    if (!res.ok) throw new Error('No se pudieron cargar eventos');
                    return res.json();
                });

                const evList = Array.isArray(evData) ? evData : evData.results || [];
                if (!mounted) return;
                setEventos(evList);

                const peData = await fetch(PERFIL_EVENTO_ENDPOINT, {
                    credentials: 'include',
                    headers: getAuthHeaders(false)
                }).then(res => {
                    if (!res.ok) throw new Error('No se pudieron cargar inscripciones');
                    return res.json();
                });

                const peList = Array.isArray(peData) ? peData : peData.results || [];
                const uid = meData.id_perfil ?? meData.id;
                if (!mounted) return;
                setInscripciones(peList.filter(i => i.id_perfil === uid));

            } catch (err) {
                console.error(err);
                setError(
                    err.message === 'No autenticado'
                        ? 'Debes iniciar sesión para inscribirte.'
                        : 'Error cargando datos.'
                );
            } finally {
                if (mounted) setLoading(false);
            }
        };

        init();
        return () => { mounted = false; };
    }, [contextUser]);

    const isInscrito = (evento) => {
        const eid = evento.id_evento ?? evento.id;
        return inscripciones.some(i => i.id_evento === eid);
    };

    const handleInscribirse = async (evento) => {
        if (!user) { setError('Debes iniciar sesión'); return; }
        setLoading(true);
        setError('');

        try {
            let estadoId = null;
            const esData = await fetch(ESTADO_ENDPOINT, {
                credentials: 'include',
                headers: getAuthHeaders(false)
            }).then(res => res.json());

            const list = Array.isArray(esData) ? esData : esData.results || [];
            const found = list.find(e => e.nombre_estado.toLowerCase() === 'inscrito');
            estadoId = found?.id_estado ?? found?.id ?? null;

            if (!estadoId) throw new Error('Estado no encontrado');

            const payload = {
                id_perfil: user.id_perfil ?? user.id,
                id_evento: evento.id_evento ?? evento.id,
                id_estado: estadoId,
                id_rol: 3
            };

            const headers = getAuthHeaders(true);
            const csrftoken = getCookie('csrftoken');
            if (csrftoken) headers['X-CSRFToken'] = csrftoken;

            const created = await fetch(PERFIL_EVENTO_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers,
                body: JSON.stringify(payload)
            }).then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            });

            setInscripciones(prev => [...prev, created]);

        } catch {
            setError('No se pudo inscribir al evento.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelarInscripcion = async (evento) => {
        if (!user) return;
        setLoading(true);

        try {
            const uid = user.id_perfil ?? user.id;
            const eid = evento.id_evento ?? evento.id;

            const res = await fetch(
                `${PERFIL_EVENTO_CANCELAR}?id_perfil=${uid}&id_evento=${eid}`,
                { method: 'DELETE', credentials: 'include' }
            );

            if (!res.ok) throw new Error();
            setInscripciones(prev => prev.filter(i => i.id_evento !== eid));

        } catch {
            setError('No se pudo cancelar la inscripción.');
        } finally {
            setLoading(false);
        }
    };

    if (userLoading || loading) return <div>Cargando...</div>;

    const isAdmin = user?.is_superuser; // solo admins

    return (
        <div className="gestion-eventos-container">

            {/* BOTÓN VOLVER */}
            <button
                className="btn-back"
                onClick={() => navigate(-1)}
                style={{ marginBottom: '20px' }}
            >
                Volver
            </button>

            <h1 className="gestion-title">Inscribirse a Eventos</h1>

            {error && <div className="error-banner">{error}</div>}

            <div className="eventos-grid">
                {eventos.map(ev => (
                    <div key={ev.id_evento ?? ev.id} className="evento-card">
                        <div className="evento-header">
                            <h3 className="evento-title">{ev.nombre_evento ?? ev.title}</h3>
                            <div className="evento-actions">
                                {isInscrito(ev)
                                    ? <button className="btn-red" onClick={() => handleCancelarInscripcion(ev)}>Cancelar</button>
                                    : <button className="btn-submit" onClick={() => handleInscribirse(ev)}>Inscribirse</button>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SOLO ADMIN PUEDE VER AdministrarEstados */}
            {isAdmin && (
                <div style={{ marginTop: '50px' }}>
                    <AdministrarEstados />
                </div>
            )}
        </div>
    );
}
