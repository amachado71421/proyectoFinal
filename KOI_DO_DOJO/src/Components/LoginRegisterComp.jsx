import Login from './login';
import Register from './Register';
import React, { useState, useEffect } from 'react';

function LoginRegisterComp() {
    const [showLogin, setShowLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifica si hay token en localStorage
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            {isAuthenticated ? (
                <p>Ya tienes sesión iniciada.</p>
            ) : (
                <>
                    {showLogin ? <Login /> : <Register />}
                    <button onClick={toggleForm}>
                        {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </>
            )}
        </div>
    );
}

export default LoginRegisterComp;
