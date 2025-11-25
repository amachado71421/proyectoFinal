import React, { useState } from 'react';
import '/src/Styles/Register.css';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        first_name: '',
        last_name: ''
    });

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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

        if (formData.password !== formData.password_confirm) {
            setError('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    password_confirm: formData.password_confirm,
                    first_name: formData.first_name,
                    last_name: formData.last_name
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.email) {
                    setError(data.email[0] || 'Error en el registro');
                } else if (data.username) {
                    setError(data.username[0] || 'Error en el registro');
                } else if (data.password) {
                    setError(data.password[0] || 'Error en el registro');
                } else if (data.detail) {
                    setError(data.detail);
                } else {
                    setError('Error en el registro. Intenta de nuevo.');
                }
            } else {
                setSuccess('Registro exitoso. Bienvenido!');
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    password_confirm: '',
                    first_name: '',
                    last_name: ''
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        } catch (Error) {
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='ContenedorRegistro'>
            <h2 className='TituloRegistro'>Registro</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}
            <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className='ContenedorImputsNombre'>
                    <label className='NombreLabel' htmlFor="first_name">Nombre:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className='NombreInput'
                        placeholder="Ingresa tu nombre"
                        maxLength="150"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>

                {/* Apellido */}
                <div className='ContenedorImputsApellido'>
                    <label className='ApellidoLabel' htmlFor="last_name">Apellido:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className='ApellidoInput'
                        placeholder="Ingresa tu apellido"
                        maxLength="150"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>

                {/* Username */}
                <div className='ContenedorImputsUsername'>
                    <label className='UsernameLabel' htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className='UsernameInput'
                        placeholder="Elige un nombre de usuario"
                        maxLength="150"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className='ContenedorImputsCorreo'>
                    <label className='CorreoLabel' htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='CorreoInput'
                        placeholder="Ingresa tu correo para registrarte"
                        maxLength="254"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Contraseña */}
                <div className='ContenedorImputsContra'>
                    <label className='ContraLabel' htmlFor="password">Contraseña:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className='ContraInput'
                        placeholder="Crea una contraseña (mín. 8 caracteres)"
                        maxLength="128"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className='BtnVerPassword' type="button" onClick={togglePassword}>
                        {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                {/* Confirmar contraseña */}
                <div className='ContenedorInputsConfirmarPassword'>
                    <label className='ConfirmarPasswordLabel' htmlFor="password_confirm">Confirmar contraseña:</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="password_confirm"
                        name="password_confirm"
                        placeholder="Repite tu contraseña"
                        className='ConfirmarPasswordInput'
                        maxLength="128"
                        value={formData.password_confirm}
                        onChange={handleChange}
                        required
                    />
                    <button className='BtnVerPassword' type="button" onClick={toggleConfirmPassword}>
                        {showConfirmPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                <button className='BtnVersubmit' type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
}

export default Register;