import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
const ENDPOINT = `${API_URL}/api/estados/`;

function CrearEstadosPerfil() {
    const [estado, setEstado] = useState('');
    const [estados, setEstados] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [editTexto, setEditTexto] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getAuthHeaders = (isJson = true) => {
        const headers = {};
        const token = localStorage.getItem('access_token');
        if (isJson) headers['Content-Type'] = 'application/json';
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
    };

    useEffect(() => {
        const fetchEstados = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(ENDPOINT, { headers: getAuthHeaders(false) });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setEstados(
                    data.map((item) => ({
                        id: item.id_estado ?? item.id,
                        nombre: item.nombre_estado ?? item.nombre,
                    }))
                );
            } catch (err) {
                setError('No se pudieron cargar los estados.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEstados();
    }, []);

    const handleAddEstado = async () => {
        const nuevo = estado.trim();
        if (!nuevo) return;
        setError('');
        setLoading(true);
        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ nombre_estado: nuevo }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.detail || 'Error al crear estado.');
                return;
            }
            const created = { id: data.id_estado ?? data.id, nombre: data.nombre_estado ?? data.nombre };
            setEstados((prev) => [...prev, created]);
            setEstado('');
        } catch (err) {
            setError('Error de conexión al crear estado.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveEstado = async (id) => {
        setError('');
        if (!window.confirm('Eliminar este estado?')) return;
        try {
            const res = await fetch(`${ENDPOINT}${id}/`, {
                method: 'DELETE',
                headers: getAuthHeaders(false),
            });
            if (res.status === 204 || res.ok) {
                setEstados((prev) => prev.filter((e) => e.id !== id));
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.detail || 'Error al eliminar estado.');
            }
        } catch (err) {
            setError('Error de conexión al eliminar estado.');
            console.error(err);
        }
    };

    const iniciarEdicion = (id, texto) => {
        setEditandoId(id);
        setEditTexto(texto);
    };

    const guardarEdicion = async () => {
        const actualizado = editTexto.trim();
        if (!actualizado || editandoId == null) return;
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${ENDPOINT}${editandoId}/`, {
                method: 'PATCH',
                headers: getAuthHeaders(true),
                body: JSON.stringify({ nombre_estado: actualizado }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.detail || 'Error al actualizar estado.');
                return;
            }
            setEstados((prev) =>
                prev.map((e) => {
                    if (e.id === editandoId) {
                        return { id: e.id, nombre: data.nombre_estado ?? actualizado };
                    }
                    return e;
                })
            );
            setEditandoId(null);
            setEditTexto('');
        } catch (err) {
            setError('Error de conexión al actualizar estado.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const renderEstadoItem = (e) => {
        if (editandoId === e.id) {
            return (
                <div>
                    <input
                        type="text"
                        value={editTexto}
                        onChange={(ev) => setEditTexto(ev.target.value)}
                    />
                    <button onClick={guardarEdicion}>Guardar</button>
                    <button
                        onClick={() => {
                            setEditandoId(null);
                            setEditTexto('');
                        }}
                        style={{ marginLeft: '0.5rem' }}
                    >
                        Cancelar
                    </button>
                </div>
            );
        }

        return (
            <div>
                <span style={{ marginRight: '1rem' }}>{e.nombre}</span>
                <button onClick={() => iniciarEdicion(e.id, e.nombre)}>Editar</button>
                <button
                    onClick={() => handleRemoveEstado(e.id)}
                    style={{ marginLeft: '0.5rem', color: 'red' }}
                >
                    Eliminar
                </button>
            </div>
        );
    };

    return (
        <div>
            <h2>Estados de perfil para el evento</h2>

            {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}

            <div style={{ marginBottom: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="Nombre del estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />
                <button onClick={handleAddEstado} disabled={loading}>
                    Añadir estado
                </button>
            </div>

            {loading && <div>Cargando...</div>}

            {estados.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Estados creados</h3>
                    <ul>
                        {estados.map((e) => (
                            <li key={e.id} style={{ marginBottom: '0.5rem' }}>
                                {renderEstadoItem(e)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CrearEstadosPerfil;