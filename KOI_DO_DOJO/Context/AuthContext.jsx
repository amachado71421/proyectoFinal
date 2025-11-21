import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await fetch('http://127.0.0.1:8000/api/auth/me/', {
    //                 method: 'GET',
    //                 credentials: 'include',
    //             });
    //             setIsAuthenticated(res.ok);
    //         } catch {
    //             setIsAuthenticated(false);
    //         }
    //     };
    //     checkAuth();
    // }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
