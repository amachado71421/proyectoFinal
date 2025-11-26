import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Autorizacion({ children }) {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/auth/me/', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    setAuthorized(true);
                } else if (res.status === 401) {
                    setAuthorized(false);
                }
            } catch (err) {
                console.error('Error al verificar sesión:', err);
                setAuthorized(false);
            }
        };

        checkAuth();
    }, []);

    if (authorized === null) {
        return <div>Verificando sesión...</div>; // estado de carga
    }

    if (!authorized) {
        return <Navigate to="/loginregister" replace />;
    }

    return children;
}

export default Autorizacion;
