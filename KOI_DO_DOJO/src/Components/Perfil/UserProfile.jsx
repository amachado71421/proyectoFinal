import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Styles/UserProfile.css';

import Palmares from './Palmares';
import Logros from './Logros';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const USERS_ENDPOINT = `${API_URL}/api/perfiles/`;
const ME_ENDPOINT = `${API_URL}/api/auth/me/`;

function UserProfile() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [roleData, setRoleData] = useState(null);

    const [savingField, setSavingField] = useState(null);
    const [imageEditing, setImageEditing] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');

    // ============================
    //       COOKIES + HEADERS
    // ============================
    const getCookie = (name) => {
        const match = document.cookie.match(
            new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
        );
        return match ? decodeURIComponent(match[2]) : null;
    };

    const getAuthHeaders = (json = true) => {
        const headers = {};
        if (json) headers['Content-Type'] = 'application/json';

        const csrf = getCookie('csrftoken');
        if (csrf) headers['X-CSRFToken'] = csrf;

        return headers;
    };

    // ============================
    //       CARGAR PERFIL
    // ============================
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(ME_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include',
                    headers: getAuthHeaders(false),
                });

                if (!res.ok) throw new Error('No se pudo obtener el perfil');

                const data = await res.json();
                setUserData(data);

                if (data.id_rol) {
                    const roleRes = await fetch(`${API_URL}/api/roles/${data.id_rol}/`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: getAuthHeaders(false),
                    });

                    if (roleRes.ok) {
                        const roleInfo = await roleRes.json();
                        setRoleData(roleInfo);
                    }
                }
            } catch (err) {
                setError('Error al cargar perfil (¿autenticado?)');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // ============================
    //      ACTUALIZAR PERFIL
    // ============================
    const updateProfile = async (patch) => {
        if (!userData) return null;
        const id = userData.id_perfil ?? userData.id;

        if (!id) {
            setError('ID de usuario no disponible.');
            return null;
        }

        setSavingField(Object.keys(patch)[0] || 'saving');

        // Update optimista
        setUserData((prev) => ({ ...prev, ...patch }));

        try {
            const res = await fetch(`${USERS_ENDPOINT}${id}/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify(patch),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data.detail || 'Error al actualizar perfil.');
                return null;
            }

            setUserData((prev) => ({ ...prev, ...data }));
            setError('');
            return data;

        } catch (err) {
            setError('Error de conexión al actualizar perfil.');
            console.error(err);
            return null;

        } finally {
            setSavingField(null);
        }
    };

    // ============================
    //     MANEJO DE CAMPOS
    // ============================
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFieldBlur = async (e) => {
        const { name, value } = e.target;
        const current = userData[name] ?? '';
        const newVal =
            (name === 'peso_kg' || name === 'altura') && value !== ''
                ? Number(value)
                : value;

        if (current === newVal) return;

        await updateProfile({ [name]: newVal });
    };

    // ============================
    //     IMAGEN PERFIL
    // ============================
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
        if (!newImageUrl || newImageUrl === userData?.url_imagen) {
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

    // ============================
    //          RENDER
    // ============================
    if (loading) return <div>Cargando perfil...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!userData) return null;

    const roleName =
        roleData?.nombre_rol || (userData.id_rol ? `Rol ID: ${userData.id_rol}` : 'Sin rol');

    return (
        <div className="user-card">

            {/* FOTO */}
            <div className="user-image">
                <img
                    src={
                        userData.url_imagen ||
                        '../../src/Images/Imagen_perfil_default.jpg'
                    }
                    alt="Foto perfil"
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer', maxWidth: 160, borderRadius: 8 }}
                />

                {imageEditing && (
                    <div className="image-edit-popup">
                        <label>URL de la imagen:</label>
                        <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="form-input"
                        />

                        <div className="btn-row">
                            <button onClick={saveImage} className="submit-btn">Guardar</button>
                            <button
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

            {/* INFO */}
            <div className="user-info">
                <h2>{userData.first_name} {userData.last_name}</h2>
                <p><strong>Usuario:</strong> {userData.username}</p>
                <p><strong>Correo:</strong> {userData.email}</p>
                <p><strong>Rol:</strong> {roleName}</p>

                {userData.is_superuser && (
                    <p style={{ color: '#d9534f' }}><strong>✓ Administrador</strong></p>
                )}
                {(!userData.is_superuser && userData.is_staff) && (
                    <p style={{ color: '#5cb85c' }}><strong>✓ Usuario con privilegios</strong></p>
                )}
            </div>

            {/* PESO Y ALTURA */}
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

            {/* LOGROS + PALMARÉS */}
            <div className="user-stats">
                <div className="user-logros">
                    <Logros />
                </div>

                <div className="user-palmares">
                    <Palmares />
                </div>
            </div>

            {/* BOTÓN ADMIN --- SIEMPRE ABAJO */}
            {(userData.is_superuser || userData.is_staff) && (
                <div className="admin-administrar">
                    <button
                        className="admin-btn"
                        onClick={() => navigate('/administrar-perfiles')}
                    >
                        Administrar Perfiles
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
