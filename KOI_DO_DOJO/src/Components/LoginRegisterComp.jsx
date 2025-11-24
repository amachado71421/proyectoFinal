import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { AuthContext } from '../../Context/AuthContext';
import '/src/Styles/LoginRegisterComp.css';

function LoginRegisterComp() {
    const { isAuthenticated } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();

    const toggleForm = () => setShowLogin(!showLogin);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/Perfil');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="login-register-container">
            {!isAuthenticated ? (
                <>
                    {showLogin ? <Login /> : <Register />}
                    <button className="BtnRegistro" onClick={toggleForm}>
                        {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </>
            ) : null}
        </div>
    );
}

export default LoginRegisterComp;
