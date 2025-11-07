import React, { useState } from 'react';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div>
            <h2>Registro</h2>
            <form>
                {/* Nombre */}
                <div>
                    <label htmlFor="name">Nombre completo</label>
                    <input
                        type="text"
                        id="name"
                        name="nombre"
                        placeholder="Ingresa tu nombre"
                        maxLength="100"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu correo"
                        maxLength="255"
                        required
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Crea una contraseña"
                        maxLength="255"
                        required
                    />
                    <button type="button" onClick={togglePassword}>
                        {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                {/* Confirmar contraseña */}
                <div>
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Repite tu contraseña"
                        maxLength="255"
                        required
                    />
                    <button type="button" onClick={toggleConfirmPassword}>
                        {showConfirmPassword ? 'Ocultar' : 'Ver'}
                    </button>
                </div>

                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
