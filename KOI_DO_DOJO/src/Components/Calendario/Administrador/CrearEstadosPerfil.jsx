import React, { useState, useEffect } from 'react';

/*
    URL base de la API.
    Se obtiene desde las variables de entorno de Vite.
    Si no existe, se utiliza una URL local por defecto.
*/
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

/*
    Endpoint específico para la gestión de estados.
    Todas las operaciones CRUD del componente usan esta ruta.
*/
const ENDPOINT = `${API_URL}/api/estados/`;

function CrearEstadosPerfil() {

    /*
        Contiene el valor del input para crear un nuevo estado.
    */
    const [estado, setEstado] = useState('');

    /*
        Lista de estados obtenidos desde la API.
        Cada estado se almacena con un id y un nombre normalizados.
    */
    const [estados, setEstados] = useState([]);

    /*
        Identificador del estado que se está editando.
        Cuando es null, no hay ningún estado en modo edición.
    */
    const [editandoId, setEditandoId] = useState(null);

    /*
        Texto editable del estado seleccionado para edición.
    */
    const [editTexto, setEditTexto] = useState('');

    /*
        Indica si hay una petición HTTP activa.
        Se utiliza para deshabilitar acciones y mostrar feedback.
    */
    const [loading, setLoading] = useState(false);

    /*
        Almacena mensajes de error para mostrarlos al usuario.
    */
    const [error, setError] = useState('');

    /*
        Genera los headers necesarios para las peticiones HTTP.
        Incluye autorización mediante token si está disponible.
        Permite omitir Content-Type cuando no se envía body JSON.
    */
    const getAuthHeaders = (isJson = true) => {
        const headers = {};
        const token = localStorage.getItem('access_token');

        if (isJson) {
            headers['Content-Type'] = 'application/json';
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    };

    /*
        Obtiene la lista de estados desde el backend al montar el componente.
        El resultado se normaliza para manejar diferencias de nombres de campos.
    */
    useEffect(() => {
        const fetchEstados = async () => {
            setLoading(true);
            setError('');

            try {
                const res = await fetch(ENDPOINT, {
                    headers: getAuthHeaders(false),
                });

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const data = await res.json();

                /*
                    Normaliza cada elemento para trabajar internamente
                    con las propiedades id y nombre.
                */
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

    /*
        Envía una petición POST para crear un nuevo estado.
        Si la creación es exitosa, se agrega al estado local.
    */
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

            /*
                Se añade el nuevo estado a la lista sin recargar datos.
            */
            setEstados((prev) => [
                ...prev,
                {
                    id: data.id_estado ?? data.id,
                    nombre: data.nombre_estado ?? data.nombre,
                },
            ]);

            setEstado('');
        } catch (err) {
            setError('Error de conexión al crear estado.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /*
        Elimina un estado existente mediante su identificador.
        Si la eliminación es exitosa, se remueve del estado local.
    */
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

    /*
        Activa el modo edición para un estado específico.
        Copia el texto actual al input de edición.
    */
    const iniciarEdicion = (id, texto) => {
        setEditandoId(id);
        setEditTexto(texto);
    };

    /*
        Envía una petición PATCH para actualizar el estado editado.
        Si la operación es exitosa, se actualiza la lista local.
    */
    const guardarEdicion = async () => {
        const actualizado = editTexto.trim();

        if (!actualizado || editandoId === null) return;

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

            /*
                Se reemplaza únicamente el estado editado.
            */
            setEstados((prev) =>
                prev.map((e) =>
                    e.id === editandoId
                        ? { id: e.id, nombre: data.nombre_estado ?? actualizado }
                        : e
                )
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

    /*
        Renderiza un estado individual.
        Cambia entre vista normal y vista de edición según el estado actual.
    */
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
                <button onClick={() => iniciarEdicion(e.id, e.nombre)}>
                    Editar
                </button>
                <button
                    onClick={() => handleRemoveEstado(e.id)}
                    style={{ marginLeft: '0.5rem', color: 'red' }}
                >
                    Eliminar
                </button>
            </div>
        );
    };

    /*
        Render principal del componente.
    */
    return (
        <div>
            <h2>Estados de perfil para el evento</h2>

            {error && (
                <div style={{ color: 'red', marginBottom: '0.5rem' }}>
                    {error}
                </div>
            )}

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
