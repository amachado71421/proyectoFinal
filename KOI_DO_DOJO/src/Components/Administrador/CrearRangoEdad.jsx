// src/Components/Administrador/CrearRangoEdad.jsx
import React, { useState, useEffect } from 'react'

function CrearRangoEdad() {
    const [categoria, setCategoria] = useState('')
    const [edadMinima, setEdadMinima] = useState('')
    const [edadMaxima, setEdadMaxima] = useState('')
    const [rangos, setRangos] = useState([])

    // 🔹 Simulación de carga inicial desde API
    useEffect(() => {
        const fetchRangos = async () => {
            try {
                // Aquí más adelante pondrás tu endpoint real, por ejemplo:
                // const response = await fetch("http://localhost:8000/api/rangos")
                // const data = await response.json()
                // setRangos(data)

                const data = [
                    { nombre: 'Infantil', min: 6, max: 11 },
                    { nombre: 'Juvenil', min: 12, max: 17 }
                ]
                setRangos(data)
            } catch (error) {
                console.error('Error cargando rangos:', error)
            }
        }

        fetchRangos()
    }, [])

    const handleAddRango = async () => {
        const min = parseInt(edadMinima)
        const max = parseInt(edadMaxima)

        if (categoria.trim() === '') {
            return
        }

        if (isNaN(min) || isNaN(max)) {
            return
        }

        if (min > max) {
            return
        }

        const nuevoRango = {
            nombre: categoria.trim(),
            min,
            max
        }

        // 🔹 Aquí más adelante harías un POST a tu API
        // await fetch("http://localhost:8000/api/rangos", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(nuevoRango)
        // })

        setRangos((prev) => [...prev, nuevoRango])
        setCategoria('')
        setEdadMinima('')
        setEdadMaxima('')
    }

    const handleRemoveRango = (nombre) => {
        setRangos((prev) => {
            return prev.filter((rango) => rango.nombre !== nombre)
        })
    }

    return (
        <div>
            <h2>Rangos de edad para el calendario</h2>

            <input
                type="text"
                placeholder="Nombre de la categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />
            <input
                type="number"
                placeholder="Edad mínima"
                value={edadMinima}
                onChange={(e) => setEdadMinima(e.target.value)}
            />
            <input
                type="number"
                placeholder="Edad máxima"
                value={edadMaxima}
                onChange={(e) => setEdadMaxima(e.target.value)}
            />
            <button onClick={handleAddRango}>Añadir rango</button>

            {rangos.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Rangos creados</h3>
                    <ul>
                        {rangos.map((rango, index) => {
                            return (
                                <li key={index}>
                                    {rango.nombre}: {rango.min} - {rango.max} años{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveRango(rango.nombre)}
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

export default CrearRangoEdad
