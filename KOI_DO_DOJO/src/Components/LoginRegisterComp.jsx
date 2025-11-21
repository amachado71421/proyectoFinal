import React, { useState, useContext } from 'react';
import Login from './login';
import Register from './Register';
import UserProfile from './Perfil/UserProfile';
import { AuthContext } from '../Context/AuthContext';

function LoginRegisterComp() {
    const { isAuthenticated } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => setShowLogin(!showLogin);

    return (
        <div>
            {isAuthenticated ? (
                <UserProfile />
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
