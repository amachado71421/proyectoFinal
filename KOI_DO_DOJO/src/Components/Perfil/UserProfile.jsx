import React, { useState, useEffect } from 'react';
import '/src/Styles/UserProfile.css';

// Importamos los componentes
import Palmares from './Palmares';
import Logros from './Logros';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const USERS_ENDPOINT = `${API_URL}/api/perfiles/`;
const ME_ENDPOINT = `${API_URL}/api/auth/me/`;

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roleData, setRoleData] = useState(null);

    const [savingField, setSavingField] = useState(null);
    const [imageEditing, setImageEditing] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');

    // leer cookie (csrftoken)
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };

    // encabezados para requests (incluye X-CSRFToken si existe)
    const getAuthHeaders = (json = true) => {
        const headers = {};
        if (json) headers['Content-Type'] = 'application/json';
        const csrf = getCookie('csrftoken');
        if (csrf) headers['X-CSRFToken'] = csrf;
        return headers;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(ME_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false),
                });

                if (!res.ok) {
                    throw new Error('No se pudo obtener el perfil');
                }

                const data = await res.json();
                setUserData(data);

                if (data.id_rol) {
                    try {
                        const roleRes = await fetch(`${API_URL}/api/roles/${data.id_rol}/`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: getAuthHeaders(false),
                        });

                        if (roleRes.ok) {
                            const roleInfo = await roleRes.json();
                            setRoleData(roleInfo);
                        }
                    } catch (roleErr) {
                        console.error('Error al cargar rol:', roleErr);
                    }
                }
            } catch (err) {
                console.error('Error al cargar perfil:', err);
                setError('Error al cargar perfil (¿autenticado?)');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const updateProfile = async (patch) => {
        if (!userData) return null;
        const id = userData.id_perfil ?? userData.id;
        if (!id) {
            setError('ID de usuario no disponible para actualizar perfil.');
            return null;
        }

        setSavingField(Object.keys(patch)[0] || 'saving');

        // optimista: aplicar cambios locales inmediatamente (mejor UX)
        setUserData((prev) => ({ ...prev, ...patch }));

        try {
            const res = await fetch(`${USERS_ENDPOINT}${id}/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify(patch),
            });

            const data = await res.json().catch(() => ({}));
            if (res.status === 401) {
                setError('No autenticado. Inicia sesión.');
                return null;
            }
            if (!res.ok) {
                console.error('Error actualizando perfil:', data);
                setError(data.detail || JSON.stringify(data) || 'Error al actualizar perfil.');
                return null;
            }

            // actualizar estado local con la respuesta del servidor (normalmente parcial)
            setUserData((prev) => ({ ...prev, ...data }));
            setError('');
            return data;
        } catch (err) {
            console.error('Error de conexión al actualizar perfil:', err);
            setError('Error de conexión al actualizar perfil.');
            return null;
        } finally {
            setSavingField(null);
        }
    };

    const handleFieldBlur = async (e) => {
        const { name, value } = e.target;
        if (!userData) return;
        const current = userData[name] ?? '';
        const newVal = (name === 'peso_kg' || name === 'altura') && value !== '' ? Number(value) : value;
        if (current === newVal) return;
        await updateProfile({ [name]: newVal });
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageClick = () => {
        setNewImageUrl(userData?.url_imagen || '');
        setImageEditing(true);
    };

    const isValidUrl = (s) => {
        try {
            new URL(s);
            return true;
        } catch {
            return false;
        }
    };

    const saveImage = async () => {
        if (!newImageUrl || newImageUrl === (userData?.url_imagen || '')) {
            setImageEditing(false);
            return;
        }
        if (!isValidUrl(newImageUrl)) {
            setError('URL de imagen inválida.');
            return;
        }
        const res = await updateProfile({ url_imagen: newImageUrl });
        if (res) setImageEditing(false);
    };

    if (loading) return <div>Cargando perfil...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!userData) return null;

    const roleName = roleData?.nombre_rol || (userData.id_rol ? `Rol ID: ${userData.id_rol}` : 'Sin rol');

return (
    <div className="user-card">

        {/* CONTENEDOR DE DOS COLUMNAS */}
        <div className="user-columns">

            {/* COLUMNA IZQUIERDA: PERFIL */}
            <div className="user-left">

                <div className="user-image">
                    <img
                        src={
                            userData.url_imagen ||
                            '../../src/Images/Imagen_perfil_default.jpg'
                        }
                        alt="Foto de perfil"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: 160, borderRadius: 8 }}
                    />
                    {imageEditing && (
                        <div
                            className="image-edit-popup"
                            style={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                background: '#fff',
                                border: '1px solid #ddd',
                                padding: 8,
                                borderRadius: 6,
                                width: 320,
                            }}
                        >
                            <label style={{ fontSize: 12 }}>URL de la imagen:</label>
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                className="form-input"
                                placeholder="https://..."
                            />
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button type="button" onClick={saveImage} className="submit-btn">
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImageEditing(false)}
                                    className="toggle-form-btn"
                                >
                                    Cancelar
                                </button>
                            </div>
                            {savingField === 'url_imagen' && <small>Guardando...</small>}
                        </div>
                    )}
                </div>

                <div className="user-info">
                    <h2>
                        {userData.first_name} {userData.last_name}
                    </h2>
                    <p>
                        <strong>Usuario:</strong> {userData.username}
                    </p>
                    <p>
                        <strong>Correo:</strong> {userData.email}
                    </p>
                    <p>
                        <strong>Rol:</strong> {roleName}
                    </p>

                    {userData.is_superuser ? (
                        <p style={{ color: '#d9534f' }}>
                            <strong>✓ Administrador</strong>
                        </p>
                    ) : userData.is_staff ? (
                        <p style={{ color: '#5cb85c' }}>
                            <strong>✓ Usuario con privilegios</strong>
                        </p>
                    ) : null}
                </div>

                <div className="user-extra">
                    <label>
                        Peso (kg):
                        <input
                            type="number"
                            name="peso_kg"
                            value={userData.peso_kg ?? ''}
                            onChange={handleFieldChange}
                            onBlur={handleFieldBlur}
                            className="form-input"
                        />
                        {savingField === 'peso_kg' && <small>Guardando...</small>}
                    </label>
                    <label>
                        Altura (cm):
                        <input
                            type="number"
                            name="altura"
                            value={userData.altura ?? ''}
                            onChange={handleFieldChange}
                            onBlur={handleFieldBlur}
                            className="form-input"
                        />
                        {savingField === 'altura' && <small>Guardando...</small>}
                    </label>
                </div>
            </div>

            
            </div>
        </div>

);

}

export default UserProfile