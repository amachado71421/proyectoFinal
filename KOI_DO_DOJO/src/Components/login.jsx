<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
=======
import React, { useState } from 'react';
import '/src/Styles/Login.css';

>>>>>>> 41fd8f8fc023008e7d468a96fe6a67453c1d0012

function Login() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const { email, password } = formData;
        if (!email || !password) {
            setError('Completa email y contraseña.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({ username: email, password }), // 👈 usa email como username
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail || 'Error en el inicio de sesión.');
            } else {
                setSuccess('Inicio de sesión exitoso. Bienvenido!');
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.error('Error de conexión:', err);
            setError('No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
        <div className="login-container">
            <h2>Iniciar Sesión</h2>

            {error && <div className="login-error">{error}</div>}
            {success && <div className="login-success">{success}</div>}

            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
=======
        <div >
            <div className='InicioSesion'>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className='ContenedorInicioSesion'>
                    <label htmlFor="email" className='EmailLabel'>Correo electrónico:</label>
>>>>>>> 41fd8f8fc023008e7d468a96fe6a67453c1d0012
                    <input
                        type="text"
                        name="email"
<<<<<<< HEAD
=======
                        className='EmailInput'
                        placeholder="Ingresa tu correo"
>>>>>>> 41fd8f8fc023008e7d468a96fe6a67453c1d0012
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />
                </div>

<<<<<<< HEAD
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
=======
                <div>
                    <label htmlFor="password" className='PasswordLabel'>Contraseña:</label>
>>>>>>> 41fd8f8fc023008e7d468a96fe6a67453c1d0012
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
<<<<<<< HEAD
=======
                        className='PasswordInput'
                        placeholder="Ingresa tu contraseña"
>>>>>>> 41fd8f8fc023008e7d468a96fe6a67453c1d0012
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                    />
                    <button className='BtnVerPassword' type="button" onClick={togglePassword}>
                        {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                <button className='BtnIngresar' type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
                 {/* OLVIDAR CONTRASEÑA */}
                        <h3 className='OlvidarContra'>¿Olvidaste tu contraseña?</h3>
            </form>
            </div>
        </div>
    );
}

export default Login;
