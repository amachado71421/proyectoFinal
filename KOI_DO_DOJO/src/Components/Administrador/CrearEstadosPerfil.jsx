// src/Components/Administrador/CrearEstadosPerfil.jsx
import React, { useState, useEffect } from 'react'

function CrearEstadosPerfil() {
    const [estado, setEstado] = useState('')
    const [estados, setEstados] = useState([])
    const [editando, setEditando] = useState(null)
    const [editTexto, setEditTexto] = useState('')

    // Simulación de carga inicial desde API
    useEffect(() => {
        const fetchEstados = async () => {
            try {
                // Aquí más adelante pondrás tu endpoint real:
                // const response = await fetch("http://localhost:8000/api/estados")
                // const data = await response.json()
                // setEstados(data)

                const data = ['No inscrito', 'Inscrito', 'Pendiente']
                setEstados(data)
            } catch (error) {
                console.error('Error cargando estados:', error)
            }
        }

        fetchEstados()
    }, [])

    const handleAddEstado = async () => {
        const nuevo = estado.trim()
        if (nuevo === '') {
            return
        }

        // Aquí más adelante harías un POST a tu API
        // await fetch("http://localhost:8000/api/estados", { method: "POST", ... })

        setEstados((prev) => [...prev, nuevo])
        setEstado('')
    }

    const handleRemoveEstado = (texto) => {
        setEstados((prev) => prev.filter((e) => e !== texto))
    }

    const iniciarEdicion = (texto) => {
        setEditando(texto)
        setEditTexto(texto)
    }

    const guardarEdicion = async () => {
        const actualizado = editTexto.trim()
        if (actualizado === '') {
            return
        }

        // 🔹 Aquí más adelante harías un PATCH al API
        // await fetch(`http://localhost:8000/api/estados/${editando}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ nombre: actualizado })
        // })

        const nuevos = estados.map((e) => {
            if (e === editando) {
                return actualizado
            }
            return e
        })

        setEstados(nuevos)
        setEditando(null)
        setEditTexto('')
    }

    return (
        <div>
            <h2>Estados de perfil para el evento</h2>

            <input
                type="text"
                placeholder="Nombre del estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            />
            <button onClick={handleAddEstado}>Añadir estado</button>

            {estados.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Estados creados</h3>
                    <ul>
                        {estados.map((texto, index) => {
                            if (editando === texto) {
                                return (
                                    <li key={index}>
                                        <input
                                            type="text"
                                            value={editTexto}
                                            onChange={(e) => setEditTexto(e.target.value)}
                                        />
                                        <button onClick={guardarEdicion}>Guardar</button>
                                        <button onClick={() => setEditando(null)} style={{ marginLeft: '0.5rem' }}>
                                            Cancelar
                                        </button>
                                    </li>
                                )
                            }

                            return (
                                <li key={index} onClick={() => iniciarEdicion(texto)}>
                                    {texto}{' '}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveEstado(texto)
                                        }}
                                        style={{ marginLeft: '0.5rem', color: 'red' }}
                                    >
                                        ❌
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CrearEstadosPerfil
