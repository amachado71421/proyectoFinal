// src/Components/Administrador/CrearLogros.jsx

import React, { useState, useEffect } from 'react'

function CrearLogros() {
    /*
     Estado para el formulario de creación de logros.
     Cada campo corresponde a un input controlado.
    */
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha, setFecha] = useState('')

    /*
     Lista de logros mostrados en pantalla.
     Cada logro tiene: nombre, descripcion y fecha.
    */
    const [logros, setLogros] = useState([])

    /*
     Almacena el identificador del logro que está siendo editado.
     En este caso se usa el nombre como referencia.
     Si es null, no hay edición activa.
    */
    const [editando, setEditando] = useState(null)

    /*
     Estado temporal para los inputs de edición.
     Permite modificar un logro sin afectar la lista original
     hasta que se confirme el guardado.
    */
    const [editData, setEditData] = useState({
        nombre: '',
        descripcion: '',
        fecha: ''
    })

    /*
     useEffect que se ejecuta una sola vez al montar el componente.
     Se encarga de cargar los logros iniciales.
    */
    useEffect(() => {
        const fetchLogros = async () => {
            try {
                /*
                 En este punto debería ir la llamada real al backend.
                 El código comentado indica cómo sería la integración
                 cuando exista el endpoint.
                */

                // const response = await fetch("http://localhost:8000/api/logros")
                // const data = await response.json()
                // setLogros(data)

                /*
                 Datos simulados usados mientras no exista el backend.
                */
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

    /*
     Crea un nuevo logro y lo añade al estado local.
     Valida que ningún campo esté vacío antes de continuar.
    */
    const handleAddLogro = async () => {
        if (
            nombre.trim() === '' ||
            descripcion.trim() === '' ||
            fecha === ''
        ) {
            return
        }

        const nuevoLogro = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            fecha
        }

        /*
         Aquí se realizaría un POST al backend cuando exista el endpoint.
        */

        // await fetch("http://localhost:8000/api/logros", { method: "POST", ... })

        setLogros(prev => [...prev, nuevoLogro])

        /*
         Limpia el formulario tras crear el logro.
        */
        setNombre('')
        setDescripcion('')
        setFecha('')
    }

    /*
     Elimina un logro de la lista usando su nombre como identificador.
    */
    const handleRemoveLogro = (nombreLogro) => {
        setLogros(prev =>
            prev.filter(logro => logro.nombre !== nombreLogro)
        )
    }

    /*
     Inicia el modo edición para un logro específico.
     Copia los datos del logro al estado de edición.
    */
    const iniciarEdicion = (logro) => {
        setEditando(logro.nombre)
        setEditData({
            nombre: logro.nombre,
            descripcion: logro.descripcion,
            fecha: logro.fecha
        })
    }

    /*
     Maneja los cambios en los inputs del formulario de edición.
     Actualiza dinámicamente el campo modificado.
    */
    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    /*
     Guarda los cambios realizados en un logro.
     Reemplaza el logro editado dentro del estado local.
    */
    const guardarEdicion = async () => {
        const actualizado = {
            nombre: editData.nombre.trim(),
            descripcion: editData.descripcion.trim(),
            fecha: editData.fecha
        }

        /*
         Aquí se realizaría un PATCH al backend cuando exista el endpoint.
        */

        // await fetch(`http://localhost:8000/api/logros/${editando}`, {
        //     method: "PATCH",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(actualizado)
        // })

        const nuevosLogros = logros.map(logro => {
            if (logro.nombre === editando) {
                return actualizado
            }
            return logro
        })

        setLogros(nuevosLogros)

        /*
         Sale del modo edición y limpia el estado temporal.
        */
        setEditando(null)
        setEditData({ nombre: '', descripcion: '', fecha: '' })
    }

    return (
        <div>
            <h2>Logros del calendario</h2>

            {/* Formulario de creación */}
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
            <button onClick={handleAddLogro}>
                Añadir logro
            </button>

            {/* Lista de logros */}
            {logros.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Logros creados</h3>
                    <ul>
                        {logros.map((logro, index) => {
                            /*
                             Renderizado condicional:
                             si el logro está en edición, se muestran inputs;
                             de lo contrario, se muestra en modo lectura.
                            */
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
                                        <button onClick={guardarEdicion}>
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditando(null)}
                                            style={{ marginLeft: '0.5rem' }}
                                        >
                                            Cancelar
                                        </button>
                                    </li>
                                )
                            }

                            return (
                                <li
                                    key={index}
                                    onClick={() => iniciarEdicion(logro)}
                                >
                                    <strong>{logro.nombre}</strong>
                                    {' '}— {logro.descripcion} ({logro.fecha})
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveLogro(logro.nombre)
                                        }}
                                        style={{ marginLeft: '0.5rem', color: 'red' }}
                                    >
                                        Eliminar
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
