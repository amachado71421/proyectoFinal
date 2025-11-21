import React, { useState, useContext } from 'react';
import Login from './login';
import Register from './Register';
<<<<<<< HEAD
import UserProfile from './Perfil/UserProfile';
import { AuthContext } from '../../Context/AuthContext';
=======
import React, { useState, useEffect } from 'react';
import '/src/Styles/LoginRegisterComp.css';
>>>>>>> 41fd8f8fc023008e7d468a96fe6a67453c1d0012

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
<<<<<<< HEAD
                    <button onClick={toggleForm}>
=======
                    {/* ✅ Si NO está autenticado, se muestra el botón */}
                    <button className='BtnRegistro'  onClick={toggleForm}>
>>>>>>> 41fd8f8fc023008e7d468a96fe6a67453c1d0012
                        {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </>
            )}
        </div>
    );
}

export default LoginRegisterComp;
