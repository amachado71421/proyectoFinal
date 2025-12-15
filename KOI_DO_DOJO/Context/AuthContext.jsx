import React, { createContext, useState, useEffect, useCallback } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userLoading, setUserLoading] = useState(true)
    const checkAuth = useCallback(async () => {
        setUserLoading(true)
        setUser(null)
        setIsAuthenticated(false)
        try {
            const res = await fetch('http://localhost:8000/api/auth/me/', {
                method: 'GET',
                credentials: 'include',
            })
            if (res.ok) {
                const data = await res.json()
                setUser(data)
                setIsAuthenticated(true)
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }
        } catch (err) {
            console.error('Error verificando sesión:', err)
            setUser(null)
            setIsAuthenticated(false)
        } finally {
            setUserLoading(false)
        }
    }, [])

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, userLoading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
