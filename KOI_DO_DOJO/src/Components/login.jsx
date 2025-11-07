import React, { useState } from 'react';

function Login() {
    // Estado para controlar visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Función que alterna el estado
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu correo"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePassword}
                    >
                        {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
