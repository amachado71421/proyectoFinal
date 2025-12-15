import React, { useState, useEffect } from 'react';
import '/src/Styles/AdministrarEstados.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const ESTADO_ENDPOINT = `${API_URL}/api/estados/`;

export default function AdministrarEstados() {
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [editId, setEditId] = useState(null);
    const [editNombre, setEditNombre] = useState('');

    // Cabeceras con JSON y CSRF
    const getAuthHeaders = (json = true) => {
        const headers = {};
        if (json) headers['Content-Type'] = 'application/json';
        const csrftoken = document.cookie.split('; ').find(c => c.startsWith('csrftoken='))?.split('=')[1];
        if (csrftoken) headers['X-CSRFToken'] = csrftoken;
        return headers;
    };

    // Cargar estados al iniciar
    useEffect(() => {
        const fetchEstados = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(ESTADO_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false),
                });
                if (!res.ok) throw new Error('No se pudieron cargar los estados');
                const data = await res.json();
                setEstados(Array.isArray(data) ? data : data.results || []);
            } catch (err) {
                console.error(err);
                setError('Error cargando estados.');
            } finally {
                setLoading(false);
            }
        };
        fetchEstados();
    }, []);

    // Crear un estado
    const handleCrearEstado = async () => {
        if (!nuevoEstado.trim()) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(ESTADO_ENDPOINT, {
                method: 'POST',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ nombre_estado: nuevoEstado }),
            });
            if (!res.ok) throw new Error('No se pudo crear el estado');
            const created = await res.json();
            setEstados(prev => [...prev, created]);
            setNuevoEstado('');
        } catch (err) {
            console.error(err);
            setError('Error creando estado.');
        } finally {
            setLoading(false);
        }
    };

    // Editar un estado
    const handleEditarEstado = async (id) => {
        if (!editNombre.trim()) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${ESTADO_ENDPOINT}${id}/`, {
                method: 'PUT',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ nombre_estado: editNombre }),
            });
            if (!res.ok) throw new Error('No se pudo editar el estado');
            const updated = await res.json();
            setEstados(prev => prev.map(e => (e.id_estado === id ? updated : e)));
            setEditId(null);
            setEditNombre('');
        } catch (err) {
            console.error(err);
            setError('Error editando estado.');
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un estado
    const handleEliminarEstado = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este estado?')) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${ESTADO_ENDPOINT}${id}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: getAuthHeaders(false),
            });
            if (!res.ok) throw new Error('No se pudo eliminar el estado');
            setEstados(prev => prev.filter(e => e.id_estado !== id));
        } catch (err) {
            console.error(err);
            setError('Error eliminando estado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="administrar-estados-container">
            <h1>Administrar Estados</h1>

            {error && <div className="error-banner">{error}</div>}
            {loading && <p className="loading-text">Cargando...</p>}

            <div className="crear-estado">
                <input
                    type="text"
                    placeholder="Nuevo estado"
                    value={nuevoEstado}
                    onChange={e => setNuevoEstado(e.target.value)}
                />
                <button className="btn-green" onClick={handleCrearEstado}>Crear</button>
            </div>

            <div className="estados-list">
                {estados.map(e => (
                    <div key={e.id_estado} className="estado-card">
                        {editId === e.id_estado ? (
                            <>
                                <input
                                    value={editNombre}
                                    onChange={ev => setEditNombre(ev.target.value)}
                                />
                                <button className="btn-green" onClick={() => handleEditarEstado(e.id_estado)}>Guardar</button>
                                <button className="btn-red" onClick={() => { setEditId(null); setEditNombre(''); }}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                <span>{e.nombre_estado}</span>
                                <div className="estado-actions">
                                    <button className="btn-green" onClick={() => { setEditId(e.id_estado); setEditNombre(e.nombre_estado); }}>Editar</button>
                                    <button className="btn-red" onClick={() => handleEliminarEstado(e.id_estado)}>Eliminar</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
