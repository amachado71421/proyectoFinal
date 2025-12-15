import { useState, useEffect } from 'react';
import '../../Styles/AdministrarPalmares.css';

const AdministradorPalmares = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [palmares, setPalmares] = useState({});
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');

    const RESULTADOS = {
        VICTORIA: 1,
        EMPATE: 2,
        DERROTA: 3,
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            setError(null);

            const resUsuarios = await fetch('http://localhost:8000/api/perfiles/');
            if (!resUsuarios.ok) throw new Error('Error al cargar usuarios');
            const dataUsuarios = await resUsuarios.json();
            setUsuarios(dataUsuarios.results || dataUsuarios);

            const resPalmares = await fetch('http://localhost:8000/api/palmares/');
            if (!resPalmares.ok) throw new Error('Error al cargar palmares');
            const dataPalmares = await resPalmares.json();
            procesarPalmares(dataPalmares.results || dataPalmares);

        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setCargando(false);
        }
    };

    const procesarPalmares = (dataPalmares) => {
        const palmaresObj = {};

        dataPalmares.forEach((palmar) => {
            const idPerfil = palmar.id_perfil;

            if (!palmaresObj[idPerfil]) {
                palmaresObj[idPerfil] = {
                    victorias: 0,
                    empates: 0,
                    derrotas: 0,
                };
            }

            if (palmar.id_resultado === RESULTADOS.VICTORIA) {
                palmaresObj[idPerfil].victorias += 1;
            } else if (palmar.id_resultado === RESULTADOS.EMPATE) {
                palmaresObj[idPerfil].empates += 1;
            } else if (palmar.id_resultado === RESULTADOS.DERROTA) {
                palmaresObj[idPerfil].derrotas += 1;
            }
        });

        setPalmares(palmaresObj);
    };

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };

    const agregarResultado = async (idPerfil, tipoResultado) => {
        try {
            const idResultado = RESULTADOS[tipoResultado];
            const csrf = getCookie('csrftoken');

            const response = await fetch('http://localhost:8000/api/palmares/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrf ? { 'X-CSRFToken': csrf } : {}),
                },
                credentials: 'include',
                body: JSON.stringify({
                    id_perfil: Number(idPerfil),
                    id_resultado: Number(idResultado),
                }),
            });

            if (!response.ok) {
                let errorBody = null;
                try {
                    errorBody = await response.json();
                } catch {
                    errorBody = await response.text();
                }
                console.error('Respuesta error /api/palmares/:', response.status, errorBody);
                throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
            }

            setPalmares((prev) => {
                const prevStats = prev[idPerfil] || { victorias: 0, empates: 0, derrotas: 0 };
                const key = tipoResultado.toLowerCase() + 's';

                return {
                    ...prev,
                    [idPerfil]: {
                        ...prevStats,
                        [key]: (prevStats[key] || 0) + 1,
                    },
                };
            });

        } catch (err) {
            setError(err.message);
            console.error('Error al agregar resultado:', err);
        }
    };

    const eliminarResultado = async (idPerfil, tipoResultado) => {
        try {
            const response = await fetch('http://localhost:8000/api/palmares/');
            const dataPalmares = await response.json();

            const palmarAEliminar = (dataPalmares.results || dataPalmares).find(
                (p) =>
                    p.id_perfil === idPerfil &&
                    p.id_resultado === RESULTADOS[tipoResultado]
            );

            if (!palmarAEliminar) {
                throw new Error('No hay registros para eliminar');
            }

            const deleteResponse = await fetch(
                `http://localhost:8000/api/palmares/${palmarAEliminar.id_palmares}/`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            if (!deleteResponse.ok) {
                throw new Error('Error al eliminar resultado');
            }

            setPalmares((prev) => ({
                ...prev,
                [idPerfil]: {
                    ...prev[idPerfil],
                    [tipoResultado.toLowerCase() + 's']:
                        Math.max(0, (prev[idPerfil][tipoResultado.toLowerCase() + 's'] || 1) - 1),
                },
            }));

        } catch (err) {
            setError(err.message);
            console.error('Error al eliminar resultado:', err);
        }
    };

    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.username.toLowerCase().includes(filtro.toLowerCase()) ||
        usuario.email.toLowerCase().includes(filtro.toLowerCase())
    );

    const obtenerEstadisticas = (idPerfil) => {
        const stats = palmares[idPerfil] || { victorias: 0, empates: 0, derrotas: 0 };
        const total = stats.victorias + stats.empates + stats.derrotas;
        return { ...stats, total };
    };

    if (cargando) {
        return <div className="administrador-palmares loading">Cargando datos...</div>;
    }

    return (
        <div className="administrador-palmares">
            <h1>Administrador de Palmares</h1>

            {error && <div className="error-mensaje">{error}</div>}

            <div className="filtro-contenedor">
                <input
                    type="text"
                    placeholder="Buscar usuario por nombre o email..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="filtro-input"
                />
                <button onClick={cargarDatos} className="btn-recargar">
                    Recargar
                </button>
            </div>

            <div className="usuarios-grid">
                {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((usuario) => {
                        const stats = obtenerEstadisticas(usuario.id_perfil);
                        return (
                            <div key={usuario.id_perfil} className="usuario-card">
                                <div className="usuario-info">
                                    {usuario.url_imagen && (
                                        <img
                                            src={usuario.url_imagen}
                                            alt={usuario.username}
                                            className="usuario-imagen"
                                        />
                                    )}
                                    <div className="usuario-datos">
                                        <h3>{usuario.username}</h3>
                                        <p className="usuario-email">{usuario.email}</p>
                                        {usuario.first_name && usuario.last_name && (
                                            <p className="usuario-nombre">
                                                {usuario.first_name} {usuario.last_name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="resultados-contenedor">

                                    {/* Victorias */}
                                    <div className="resultado-grupo victoria">
                                        <div className="resultado-header">
                                            <span className="resultado-label">Victorias</span>
                                            <span className="resultado-numero">{stats.victorias}</span>
                                        </div>
                                        <div className="resultado-botones">
                                            <button
                                                onClick={() => agregarResultado(usuario.id_perfil, 'VICTORIA')}
                                                className="btn-agregar btn-victoria"
                                            >
                                                Agregar
                                            </button>
                                            <button
                                                onClick={() => eliminarResultado(usuario.id_perfil, 'VICTORIA')}
                                                className="btn-eliminar btn-victoria"
                                                disabled={stats.victorias === 0}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>

                                    {/* Empates */}
                                    <div className="resultado-grupo empate">
                                        <div className="resultado-header">
                                            <span className="resultado-label">Empates</span>
                                            <span className="resultado-numero">{stats.empates}</span>
                                        </div>
                                        <div className="resultado-botones">
                                            <button
                                                onClick={() => agregarResultado(usuario.id_perfil, 'EMPATE')}
                                                className="btn-agregar btn-empate"
                                            >
                                                Agregar
                                            </button>
                                            <button
                                                onClick={() => eliminarResultado(usuario.id_perfil, 'EMPATE')}
                                                className="btn-eliminar btn-empate"
                                                disabled={stats.empates === 0}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>

                                    {/* Derrotas */}
                                    <div className="resultado-grupo derrota">
                                        <div className="resultado-header">
                                            <span className="resultado-label">Derrotas</span>
                                            <span className="resultado-numero">{stats.derrotas}</span>
                                        </div>
                                        <div className="resultado-botones">
                                            <button
                                                onClick={() => agregarResultado(usuario.id_perfil, 'DERROTA')}
                                                className="btn-agregar btn-derrota"
                                            >
                                                Agregar
                                            </button>
                                            <button
                                                onClick={() => eliminarResultado(usuario.id_perfil, 'DERROTA')}
                                                className="btn-eliminar btn-derrota"
                                                disabled={stats.derrotas === 0}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="estadisticas-total">
                                    <span>Total de encuentros: <strong>{stats.total}</strong></span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="sin-resultados">
                        {filtro ? 'No se encontraron usuarios con ese filtro' : 'No hay usuarios disponibles'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdministradorPalmares;
    