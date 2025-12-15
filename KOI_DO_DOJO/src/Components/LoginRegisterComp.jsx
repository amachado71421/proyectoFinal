import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import '/src/Styles/LoginRegisterComp.css';

function LoginRegisterComp() {
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();

    const toggleForm = () => setShowLogin(!showLogin);

    // 🔴 Función para navegar al perfil y recargar la página
    const goToProfileAndReload = () => {
        navigate('/perfil-usuario');
    }

    return (
        <div className="login-register-container">
            {showLogin ? 
                <Login onSuccess={goToProfileAndReload} /> 
                : 
                <Register onSuccess={goToProfileAndReload} />
            }
            <button className="BtnRegistro" onClick={toggleForm}>
                {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
        </div>
    );
}

export default LoginRegisterComp;
