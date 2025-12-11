import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '/src/Styles/LoginRegisterComp.css';

function LoginRegisterComp() {
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => setShowLogin(!showLogin);

    return (
        <div className="login-register-container">
            {showLogin ? <Login /> : <Register />}
            <button className="BtnRegistro" onClick={toggleForm}>
                {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
        </div>
    );
}

export default LoginRegisterComp;
