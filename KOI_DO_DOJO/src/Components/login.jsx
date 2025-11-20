import React, { useState } from 'react';
import Layer1 from '../Components/LayerProfile/Layer1';


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.email || !formData.password) {
            setError('Completa email y contraseña.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.detail) {
                    setError(data.detail);
                } else if (data.email) {
                    setError(Array.isArray(data.email) ? data.email[0] : data.email);
                } else {
                    setError('Error en el inicio de sesión.');
                }
            } else {
                setSuccess('Inicio de sesión exitoso. Bienvenido!');
                if (data.access) localStorage.setItem('access_token', data.access);
                if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
                if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

                // ✅ Recargar la página en lugar de navegar
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='InicioSesión'>
            <Layer1/>
            <h2 className='TituloIniciarSesion'>Iniciar Sesión</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className='ContenedorInicioSesion'>
                    <label htmlFor="email" className='EmailLabel'>Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='EmailInput'
                        placeholder="Ingresa tu correo"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className=''>Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="button" onClick={togglePassword}>
                        {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
}

export default Login;
