import { useEffect, useState } from 'react';

export function useAuthCheck() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = aún no confirmado

    useEffect(() => {
        const checkAuth = async () => {
            // 👇 Si no hay cookies → no hay sesión, no llamar al backend
            if (!document.cookie || document.cookie.trim() === "") {
                setIsAuthenticated(false);
                return;
            }

            try {
                const res = await fetch('http://localhost:8000/api/auth/me/', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    setIsAuthenticated(true);
                } else if (res.status === 401) {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error('Error al verificar sesión:', err);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return isAuthenticated;
}
