import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Styles/Register.css';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        first_name: '',
        last_name: ''
    });

    // Mismo método que en Login
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
            // -------------------------
            // 1) Registrar usuario
            // -------------------------
            const response = await fetch('http://localhost:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.email) setError(data.email[0]);
                else if (data.username) setError(data.username[0]);
                else if (data.password) setError(data.password[0]);
                else if (data.detail) setError(data.detail);
                else setError('Error en el registro.');
                setLoading(false);
                return;
            }

            // -------------------------
            // 2) Registro OK → Login automático
            // -------------------------
            setSuccess('Registro exitoso, iniciando sesión...');

            const loginResp = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            const loginData = await loginResp.json();

            if (!loginResp.ok) {
                setError('El registro fue exitoso pero no se pudo iniciar sesión.');
                console.log(loginData);
                setLoading(false);
                return;
            }

            // -------------------------
            // 3) Redirigir igual que Login
            // -------------------------
            setSuccess('Registro exitoso! Redirigiendo...');
            setTimeout(() => {
                navigate('/Perfil');
            }, 1500);

        } catch (error) {
            console.error(error);
            setError('Error de conexión.');
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
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className='ContenedorImputsCorreo '>
                    <label className='CorreoLabel' htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='CorreoInput'
                        placeholder="Ingresa tu correo"
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
                        placeholder="Crea una contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className='BtnVerPassword' type="button" onClick={togglePassword}>
                        {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                {/* Confirmar */}
                <div className='ContenedorInputsConfirmarPassword'>
                    <label className='ConfirmarPasswordLabel' htmlFor="password_confirm">Confirmar contraseña:</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="password_confirm"
                        name="password_confirm"
                        className='ConfirmarPasswordInput'
                        placeholder="Repite la contraseña"
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
