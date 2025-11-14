// src/Components/Administrador/CrearLogros.jsx
import React, { useState, useEffect } from 'react'

function CrearLogros() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha, setFecha] = useState('')
    const [logros, setLogros] = useState([])
    const [editando, setEditando] = useState(null)
    const [editData, setEditData] = useState({
        nombre: '',
        descripcion: '',
        fecha: ''
    })

    useEffect(() => {
        const fetchLogros = async () => {
            try {
                // Aquí más adelante pondrás tu endpoint real
                // const response = await fetch("http://localhost:8000/api/logros")
                // const data = await response.json()
                // setLogros(data)

                const data = [
                    {
                        nombre: 'Primer Torneo',
                        descripcion: 'Participación en el primer torneo regional',
                        fecha: '2025-06-10'
                    },
                    {
                        nombre: 'Examen Cinturón Amarillo',
                        descripcion: 'Aprobación del examen de grado',
                        fecha: '2025-08-01'
                    }
                ]
                setLogros(data)
            } catch (error) {
                console.error('Error cargando logros:', error)
            }
        }

        fetchLogros()
    }, [])

    const handleAddLogro = async () => {
        if (nombre.trim() === '' || descripcion.trim() === '' || fecha === '') {
            return
        }

        const nuevoLogro = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            fecha
        }

        // Aquí más adelante harías un POST a tu API
        // await fetch("http://localhost:8000/api/logros", { method: "POST", ... })

        setLogros((prev) => [...prev, nuevoLogro])
        setNombre('')
        setDescripcion('')
        setFecha('')
    }

    const handleRemoveLogro = (nombreLogro) => {
        setLogros((prev) => {
            return prev.filter((logro) => logro.nombre !== nombreLogro)
        })
    }

    const iniciarEdicion = (logro) => {
        setEditando(logro.nombre)
        setEditData({
            nombre: logro.nombre,
            descripcion: logro.descripcion,
            fecha: logro.fecha
        })
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const guardarEdicion = async () => {
        const actualizado = {
            nombre: editData.nombre.trim(),
            descripcion: editData.descripcion.trim(),
            fecha: editData.fecha
        }

        // Aquí más adelante harías un PATCH al API
        // await fetch(`http://localhost:8000/api/logros/${editando}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(actualizado)
        // })

        const nuevosLogros = logros.map((logro) => {
            if (logro.nombre === editando) {
                return actualizado
            }
            return logro
        })

        setLogros(nuevosLogros)
        setEditando(null)
        setEditData({ nombre: '', descripcion: '', fecha: '' })
    }

    return (
        <div>
            <h2>Logros del calendario</h2>

            <input
                type="text"
                placeholder="Nombre del logro"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <button onClick={handleAddLogro}>Añadir logro</button>

            {logros.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Logros creados</h3>
                    <ul>
                        {logros.map((logro, index) => {
                            if (editando === logro.nombre) {
                                return (
                                    <li key={index}>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={editData.nombre}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="text"
                                            name="descripcion"
                                            value={editData.descripcion}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="date"
                                            name="fecha"
                                            value={editData.fecha}
                                            onChange={handleEditChange}
                                        />
                                        <button onClick={guardarEdicion}>Guardar</button>
                                        <button onClick={() => setEditando(null)} style={{ marginLeft: '0.5rem' }}>
                                            Cancelar
                                        </button>
                                    </li>
                                )
                            }

                            return (
                                <li key={index} onClick={() => iniciarEdicion(logro)}>
                                    <strong>{logro.nombre}</strong> — {logro.descripcion} ({logro.fecha}){' '}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveLogro(logro.nombre)
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

export default CrearLogros
