import React, { createContext, useState, useEffect, useCallback } from 'react'

// Contexto que se usará en toda la aplicación para acceder al estado de autenticación
export const AuthContext = createContext()

// Provider que envuelve la aplicación y gestiona la sesión del usuario
export const AuthProvider = ({ children }) => {

    // Información del usuario autenticado
    const [user, setUser] = useState(null)

    // Indica si el usuario está autenticado o no
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Indica si se está verificando la sesión (útil para loaders)
    const [userLoading, setUserLoading] = useState(true)

    // Función que verifica si existe una sesión activa en el backend
    // useCallback evita que la función se recree en cada render
    const checkAuth = useCallback(async () => {
        // Comienza la verificación de sesión
        setUserLoading(true)

        // Reinicia el estado antes de validar
        setUser(null)
        setIsAuthenticated(false)

        try {
            // Petición al endpoint que devuelve el usuario autenticado
            const res = await fetch('http://localhost:8000/api/auth/me/', {
                method: 'GET',
                // Permite enviar cookies HttpOnly (JWT)
                credentials: 'include',
            })

            // Si la sesión es válida
            if (res.ok) {
                const data = await res.json()
                setUser(data)
                setIsAuthenticated(true)
            } else {
                // Si la sesión no es válida
                setUser(null)
                setIsAuthenticated(false)
            }
        } catch (err) {
            // Error de red u otro problema inesperado
            console.error('Error verificando sesión:', err)
            setUser(null)
            setIsAuthenticated(false)
        } finally {
            // Finaliza el estado de carga
            setUserLoading(false)
        }
    }, [])

    // Verificar la sesión automáticamente al cargar la aplicación
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    // Se expone el estado y funciones a todos los componentes hijos
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, userLoading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
