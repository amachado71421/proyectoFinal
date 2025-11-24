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
                setAuthorized(res.ok);
            } catch {
                setAuthorized(false);
            }
        };
        checkAuth();
    }, []);

    if (authorized === null) return <div>Verificando sesión...</div>;
    if (authorized) return children;
    return <Navigate to="/loginregister" replace />;
}

export default Autorizacion;
