import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Styles/Login.css';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Obtener cookies (ej. CSRF)
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

        const { username, password } = formData;
        if (!username || !password) {
            setError('Completa usuario y contraseña.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                credentials: 'include', // importante para que se seteen cookies HttpOnly
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail || 'Error en el inicio de sesión.');
            } else {
                setSuccess('Credenciales válidas, redirigiendo...');
                // Paso 2 lo maneja Autorizacion en /Perfil
                navigate('/Perfil');
            }
        } catch (err) {
            console.error('Error de conexión:', err);
            setError('No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="InicioSesion">
                <h2>Iniciar Sesión</h2>

                {error && <div className="login-error">{error}</div>}
                {success && <div className="login-success">{success}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="ContenedorInicioSesion">
                        <label htmlFor="username" className="EmailLabel">Nombre de usuario:</label>
                        <input
                            type="text"
                            name="username"
                            className="EmailInput"
                            placeholder="Ingresa tu usuario"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="ContenedorInicioSesion">
                        <label htmlFor="password" className="PasswordLabel">Contraseña:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="PasswordInput"
                            placeholder="Ingresa tu contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                        <button className="BtnVerPassword" type="button" onClick={togglePassword}>
                            {showPassword ? 'Ocultar' : 'Ver'}
                        </button>
                    </div>

                    <button className="BtnIngresar" type="submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>

                    {/* OLVIDAR CONTRASEÑA */}
                    <h3 className="OlvidarContra">¿Olvidaste tu contraseña?</h3>
                </form>
            </div>
        </div>
    );
}

export default Login;
