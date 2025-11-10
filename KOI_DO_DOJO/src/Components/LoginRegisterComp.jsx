import Login from './login';
import Register from './Register';
import React, { useState } from 'react';


function LoginRegisterComp() {
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            {showLogin ? <Login /> : <Register />}
            <button onClick={toggleForm}>
                {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
        </div>
    );
}

export default LoginRegisterComp;