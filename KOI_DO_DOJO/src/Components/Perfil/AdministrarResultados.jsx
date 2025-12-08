import { useState, useEffect } from 'react'
import '../../Styles/AdministrarResultados.css'

const AdministrarResultados = () => {
    const [resultados, setResultados] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)
    const [nuevoResultado, setNuevoResultado] = useState('')
    const [editandoId, setEditandoId] = useState(null)
    const [editandoTexto, setEditandoTexto] = useState('')

    useEffect(() => {
        cargarResultados()
    }, [])

    const cargarResultados = async () => {
        try {
            setCargando(true)
            setError(null)

            const response = await fetch('http://localhost:8000/api/resultados/', {
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Error al cargar resultados')
            }

            const data = await response.json()
            setResultados(data.results || data)
        } catch (err) {
            setError(err.message)
            console.error('Error:', err)
        } finally {
            setCargando(false)
        }
    }

    const crearResultado = async (e) => {
        e.preventDefault()

        if (!nuevoResultado.trim()) {
            setError('Ingresa un nombre para el resultado')
            return
        }

        try {
            setError(null)
            setExito(null)

            const response = await fetch('http://localhost:8000/api/resultados/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    estado_resultado: nuevoResultado.trim(),
                }),
            })

            const responseData = await response.json()

            if (!response.ok) {
                console.error('Error del servidor:', responseData)
                throw new Error(
                    JSON.stringify(responseData) || 'Error al crear resultado'
                )
            }

            setResultados([...resultados, responseData])
            setNuevoResultado('')
            setExito('✓ Resultado creado correctamente')
            setTimeout(() => setExito(null), 2000)
        } catch (err) {
            setError(err.message)
            console.error('Error:', err)
        }
    }

    const actualizarResultado = async (id) => {
        if (!editandoTexto.trim()) {
            setError('Ingresa un nombre para el resultado')
            return
        }

        try {
            setError(null)
            setExito(null)

            const response = await fetch(
                `http://localhost:8000/api/resultados/${id}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        estado_resultado: editandoTexto.trim(),
                    }),
                }
            )

            const responseData = await response.json()

            if (!response.ok) {
                console.error('Error del servidor:', responseData)
                throw new Error(JSON.stringify(responseData))
            }

            setResultados(
                resultados.map((r) =>
                    r.id_resultado === id
                        ? { ...r, estado_resultado: editandoTexto }
                        : r
                )
            )

            setEditandoId(null)
            setEditandoTexto('')
            setExito('✓ Resultado actualizado correctamente')
            setTimeout(() => setExito(null), 2000)
        } catch (err) {
            setError(err.message)
            console.error('Error:', err)
        }
    }

    const eliminarResultado = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este resultado?')) {
            return
        }

        try {
            setError(null)
            setExito(null)

            const response = await fetch(
                `http://localhost:8000/api/resultados/${id}/`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Error al eliminar resultado')
            }

            setResultados(resultados.filter((r) => r.id_resultado !== id))
            setExito('✓ Resultado eliminado correctamente')
            setTimeout(() => setExito(null), 2000)
        } catch (err) {
            setError(err.message)
            console.error('Error:', err)
        }
    }

    const iniciarEdicion = (resultado) => {
        setEditandoId(resultado.id_resultado)
        setEditandoTexto(resultado.estado_resultado)
    }

    const cancelarEdicion = () => {
        setEditandoId(null)
        setEditandoTexto('')
    }

    if (cargando) {
        return (
            <div className="administrar-resultados loading">
                <div className="spinner"></div>
                <p>Cargando resultados...</p>
            </div>
        )
    }

    return (
        <div className="administrar-resultados">
            <div className="contenedor-principal">
                <h1>⚔️ Administrador de Resultados</h1>

                {error && (
                    <div className="alerta alerta-error">
                        <strong>❌ Error:</strong> {error}
                        <button
                            className="btn-cerrar-alerta"
                            onClick={() => setError(null)}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {exito && (
                    <div className="alerta alerta-exito">
                        {exito}
                    </div>
                )}

                {/* Formulario para crear resultado */}
                <div className="formulario-contenedor">
                    <h2>➕ Crear Nuevo Resultado</h2>
                    <form onSubmit={crearResultado} className="formulario">
                        <div className="input-grupo">
                            <input
                                type="text"
                                placeholder="Ej: Victoria, Derrota, Empate..."
                                value={nuevoResultado}
                                onChange={(e) => setNuevoResultado(e.target.value)}
                                className="input-resultado"
                            />
                            <button type="submit" className="btn-crear">
                                Crear Resultado
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lista de resultados */}
                <div className="resultados-contenedor">
                    <h2>📋 Resultados Existentes</h2>

                    {resultados.length > 0 ? (
                        <div className="resultados-grid">
                            {resultados.map((resultado) => (
                                <div
                                    key={resultado.id_resultado}
                                    className="resultado-card"
                                >
                                    <div className="resultado-contenido">
                                        {editandoId === resultado.id_resultado ? (
                                            <div className="edicion-contenedor">
                                                <input
                                                    type="text"
                                                    value={editandoTexto}
                                                    onChange={(e) => setEditandoTexto(e.target.value)}
                                                    className="input-edicion"
                                                    autoFocus
                                                />
                                                <div className="botones-edicion">
                                                    <button
                                                        onClick={() =>
                                                            actualizarResultado(resultado.id_resultado)
                                                        }
                                                        className="btn-guardar"
                                                    >
                                                        💾 Guardar
                                                    </button>
                                                    <button
                                                        onClick={cancelarEdicion}
                                                        className="btn-cancelar"
                                                    >
                                                        ✕ Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="resultado-info">
                                                    <span className="resultado-id">
                                                        ID: {resultado.id_resultado}
                                                    </span>
                                                    <h3 className="resultado-nombre">
                                                        {resultado.estado_resultado}
                                                    </h3>
                                                </div>
                                                <div className="resultado-acciones">
                                                    <button
                                                        onClick={() => iniciarEdicion(resultado)}
                                                        className="btn-editar"
                                                        title="Editar"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            eliminarResultado(resultado.id_resultado)
                                                        }
                                                        className="btn-eliminar"
                                                        title="Eliminar"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="sin-resultados">
                            <p>No hay resultados registrados</p>
                            <p className="hint">Crea el primero usando el formulario de arriba</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdministrarResultados