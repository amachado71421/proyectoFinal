import Login from './login';
import UserProfile from './Perfil/UserProfile';
import Register from './Register';
import React, { useState, useEffect } from 'react';
import '/src/Styles/LoginRegisterComp.css';

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
                // ✅ Si está autenticado, se muestra el perfil
                <UserProfile />
            ) : (
                <>
                    {showLogin ? <Login /> : <Register />}
                    {/* ✅ Si NO está autenticado, se muestra el botón */}
                    <button className='BtnRegistro'  onClick={toggleForm}>
                        {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </>
            )}
        </div>
    );
}

export default LoginRegisterComp;
