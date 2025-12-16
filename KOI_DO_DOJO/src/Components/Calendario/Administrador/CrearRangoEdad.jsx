// src/Components/Administrador/CrearRangoEdad.jsx

import React, { useState, useEffect } from 'react'

function CrearRangoEdad() {
    /*
     Nombre de la categoría del rango de edad.
     Se usa como etiqueta descriptiva del rango.
    */
    const [categoria, setCategoria] = useState('')

    /*
     Edad mínima del rango.
     Se guarda como string porque proviene de un input,
     pero se convierte a número antes de usarse.
    */
    const [edadMinima, setEdadMinima] = useState('')

    /*
     Edad máxima del rango.
     Mismo comportamiento que edadMinima.
    */
    const [edadMaxima, setEdadMaxima] = useState('')

    /*
     Lista de rangos de edad creados.
     Cada rango contiene: nombre, edad mínima y edad máxima.
    */
    const [rangos, setRangos] = useState([])

    /*
     useEffect que se ejecuta al montar el componente.
     Se encarga de cargar los rangos existentes.
    */
    useEffect(() => {
        const fetchRangos = async () => {
            try {
                /*
                 Aquí se integrará la llamada real al backend.
                 El código comentado muestra cómo se conectará
                 cuando exista el endpoint.
                */

                // const response = await fetch("http://localhost:8000/api/rangos")
                // const data = await response.json()
                // setRangos(data)

                /*
                 Datos temporales usados mientras no exista la API.
                */
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

    /*
     Crea un nuevo rango de edad y lo agrega a la lista.
     Incluye validaciones básicas antes de continuar.
    */
    const handleAddRango = async () => {
        const min = parseInt(edadMinima, 10)
        const max = parseInt(edadMaxima, 10)

        /*
         Valida que el nombre no esté vacío.
        */
        if (categoria.trim() === '') {
            return
        }

        /*
         Valida que ambas edades sean números válidos.
        */
        if (isNaN(min) || isNaN(max)) {
            return
        }

        /*
         Valida que la edad mínima no sea mayor que la máxima.
        */
        if (min > max) {
            return
        }

        const nuevoRango = {
            nombre: categoria.trim(),
            min,
            max
        }

        /*
         Aquí se realizará el POST al backend cuando exista el endpoint.
        */

        // await fetch("http://localhost:8000/api/rangos", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(nuevoRango)
        // })

        setRangos(prev => [...prev, nuevoRango])

        /*
         Limpia el formulario después de crear el rango.
        */
        setCategoria('')
        setEdadMinima('')
        setEdadMaxima('')
    }

    /*
     Elimina un rango de edad usando su nombre como referencia.
    */
    const handleRemoveRango = (nombre) => {
        setRangos(prev =>
            prev.filter(rango => rango.nombre !== nombre)
        )
    }

    return (
        <div>
            <h2>Rangos de edad para el calendario</h2>

            {/* Formulario de creación de rangos */}
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
            <button onClick={handleAddRango}>
                Añadir rango
            </button>

            {/* Lista de rangos creados */}
            {rangos.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Rangos creados</h3>
                    <ul>
                        {rangos.map((rango, index) => (
                            <li key={index}>
                                {rango.nombre}: {rango.min} - {rango.max} años
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRango(rango.nombre)}
                                    style={{ marginLeft: '0.5rem', color: 'red' }}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CrearRangoEdad
