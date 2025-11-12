// src/Components/Administrador/CrearEtiquetas.jsx
import React, { useState, useEffect } from 'react'

function CrearEtiquetas() {
    const [tagName, setTagName] = useState('')
    const [tags, setTags] = useState([])

    //Simulación de carga inicial desde API
    useEffect(() => {
        const fetchTags = async () => {
            try {
                // Aquí más adelante se pondrá el endpoint real, por ejemplo:
                // const response = await fetch("http://localhost:8000/api/tags")
                // const data = await response.json()
                // setTags(data)

                // Por ahora etiquetas estáticas de prueba:
                const data = ['Karate', 'Torneo', 'Entrenamiento']
                setTags(data)
            } catch (error) {
                console.error('Error cargando etiquetas:', error)
            }
        }

        fetchTags()
    }, [])

    const handleChange = (e) => {
        setTagName(e.target.value)
    }

    const handleAddTag = async () => {
        if (tagName.trim() === '') {
            return
        }

        const newTag = tagName.trim()

        //Aquí más adelante se hará un post a API
        // await fetch("http://localhost:8000/api/tags", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name: newTag })
        // })

        setTags((prev) => [...prev, newTag])
        setTagName('')
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
    }

    return (
        <div>
            <h2>Etiquetas para el calendario</h2>

            <input
                type="text"
                placeholder="Nombre de etiqueta"
                value={tagName}
                onChange={handleChange}
            />
            <button onClick={handleAddTag}>Añadir etiqueta</button>

            {tags.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Etiquetas creadas</h3>
                    <ul>
                        {tags.map((tag, index) => {
                            return (
                                <li key={index}>
                                    {tag}{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
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

export default CrearEtiquetas
