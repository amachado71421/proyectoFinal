// src/Components/Perfil/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import '/src/Styles/UserProfile.css';

// Importamos los componentes
import Palmares from './Palmares';
import Logros from './Logros';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/auth/me/', {
                    method: 'GET',
                    credentials: 'include', // envía cookies HttpOnly
                });

                if (!res.ok) {
                    throw new Error('No se pudo obtener el perfil');
                }

                const data = await res.json();
                setUserData(data);
            } catch (err) {
                console.error('Error al cargar perfil:', err);
                setError('Error al cargar perfil');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div>Cargando perfil...</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return null;

    return (
        <div className="user-card">
            <div className="user-image">
                <img
                    src={userData.url_imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWZ1thmT--iqRTOaH45gaSxGzTQf6fIQXyg&s"}
                    alt="Foto de perfil"
                />
            </div>
            <div className="user-info">
                <h2>{userData.first_name} {userData.last_name}</h2>
                <p><strong>Usuario:</strong> {userData.username}</p>
                <p><strong>Correo:</strong> {userData.email}</p>
                <p><strong>Rol:</strong> {userData.id_rol?.nombre || 'Sin rol'}</p>
            </div>

            <div className="user-extra">
                <label>
                    Peso (kg):
                    <input
                        type="number"
                        name="peso_kg"
                        value={userData.peso_kg || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Altura (cm):
                    <input
                        type="number"
                        name="altura"
                        value={userData.altura || ''}
                        onChange={handleChange}
                    />
                </label>
            </div>

            {/* Contenedor para logros y palmarés */}
            <div className="user-stats">
                <div className="user-logros">
                    <Logros />
                </div>
                <div className="user-palmares">
                    <Palmares />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
