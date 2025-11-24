import React, { useEffect, useState } from 'react';
import BarraMenu from '../Components/BarraMenu';
import '/src/Styles/Perfil.css';
import Layer1 from '../Components/LayerProfile/Layer1';
import Layer2 from '../Components/LayerProfile/Layer2';
import UserProfile from '../Perfil/UserProfile';

function Perfil() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 🔐 Verifica autenticación preguntando al backend
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/auth/me/', {
                    method: 'GET',
                    credentials: 'include', // 👈 envía las cookies HttpOnly
                });
                setIsAuthenticated(res.ok); // true si el backend reconoce la cookie
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <div>
            <BarraMenu />
            <div className='EspacioBajar'>
                {/* 👇 Si NO está autenticado → mostrar las layers */}
                {!isAuthenticated && (
                    <>
                        <Layer1 />
                        <Layer2 />
                    </>
                )}

                {/* 👇 Si SÍ está autenticado → mostrar perfil */}
                {isAuthenticated && <UserProfile />}
            </div>
        </div>
    );
}

export default Perfil;
