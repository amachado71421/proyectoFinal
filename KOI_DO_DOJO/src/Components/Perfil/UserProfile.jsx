import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import '/src/Styles/UserProfile.css'


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const USERS_ENDPOINT = `${API_URL}/api/perfiles/`
const ME_ENDPOINT = `${API_URL}/api/auth/me/`

function UserProfile() {
    const navigate = useNavigate()
    const { user, userLoading, checkAuth } = useContext(AuthContext)

    const [userData, setUserData] = useState(null)
    const [originalData, setOriginalData] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [error, setError] = useState('')
    const [roleData, setRoleData] = useState(null)
    const [savingField, setSavingField] = useState(null)
    const [imageEditing, setImageEditing] = useState(false)
    const [newImageUrl, setNewImageUrl] = useState('')

    // Función para obtener cookies
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'))
        return match ? decodeURIComponent(match[2]) : null
    }

    const getAuthHeaders = (json = true) => {
        const headers = {}
        if (json) headers['Content-Type'] = 'application/json'
        const csrf = getCookie('csrftoken')
        if (csrf) headers['X-CSRFToken'] = csrf
        return headers
    }

    // 🔄 Recarga solo una vez para asegurar que AuthContext esté actualizado
    useEffect(() => {
        const hasReloaded = sessionStorage.getItem('profileReloaded')
        if (!hasReloaded) {
            sessionStorage.setItem('profileReloaded', 'true')
            window.location.reload()
        }
    }, [])

    /* ============================
       CARGAR PERFIL DEL USUARIO
    ============================ */
    useEffect(() => {
        if (userLoading) return

        const fetchUserData = async () => {
            setLoadingProfile(true)
            try {
                const res = await fetch(ME_ENDPOINT, {
                    credentials: 'include',
                    headers: getAuthHeaders(false),
                })
                if (!res.ok) throw new Error()
                const data = await res.json()
                setUserData(data)
                setOriginalData(data)

                if (data.id_rol) {
                    const roleRes = await fetch(`${API_URL}/api/roles/${data.id_rol}/`, {
                        credentials: 'include',
                        headers: getAuthHeaders(false),
                    })
                    if (roleRes.ok) {
                        setRoleData(await roleRes.json())
                    }
                }
            } catch {
                setError('Error al cargar perfil')
            } finally {
                setLoadingProfile(false)
            }
        }

        fetchUserData()
    }, [userLoading])

    /* ============================
       ACTUALIZAR PERFIL
    ============================ */
    const updateProfile = async (patch) => {
        const id = userData?.id_perfil ?? userData?.id
        if (!id) { setError('ID de perfil no disponible'); return }
        const field = Object.keys(patch)[0]
        setSavingField(field)

        try {
            const res = await fetch(`${USERS_ENDPOINT}${id}/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: getAuthHeaders(true),
                body: JSON.stringify(patch),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) { setError(data.detail || 'Error al guardar'); return }
            setUserData(prev => ({ ...prev, ...data }))
            setOriginalData(prev => ({ ...prev, ...data }))
            setError('')
        } catch {
            setError('Error de conexión al guardar')
        } finally {
            setSavingField(null)
        }
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({ ...prev, [name]: value }))
    }

    const handleFieldBlur = async (e) => {
        const { name, value } = e.target
        const originalValue = originalData?.[name] ?? ''
        const newValue = (name === 'peso_kg' || name === 'altura') && value !== '' ? Number(value) : value
        if (originalValue === newValue) return
        await updateProfile({ [name]: newValue })
    }

    const handleImageClick = () => {
        setNewImageUrl(userData?.url_imagen || '')
        setImageEditing(true)
    }

    const isValidUrl = (s) => {
        try { new URL(s); return true } catch { return false }
    }

    const saveImage = async () => {
        if (!newImageUrl || newImageUrl === userData?.url_imagen) { setImageEditing(false); return }
        if (!isValidUrl(newImageUrl)) { setError('URL de imagen inválida'); return }
        await updateProfile({ url_imagen: newImageUrl })
        setImageEditing(false)
    }

    /* ============================
       RENDER
    ============================ */
    if (userLoading || loadingProfile) return <div>Cargando perfil...</div>
    if (error) return <div style={{ color: 'red' }}>{error}</div>
    if (!userData) return null

    const roleName = roleData?.nombre_rol || (userData.id_rol ? `Rol ID: ${userData.id_rol}` : 'Sin rol')
    const isSuperuser = !!user?.is_superuser
    const isStaff = !!user?.is_staff

    return (
        <div className="div-perfil">
            <div className="user-card">
                {/* Imagen de perfil */}
                <div className="user-image">
                    <img
                        src={userData.url_imagen || '../../src/Images/Imagen_perfil_default.jpg'}
                        alt="Foto perfil"
                        onClick={handleImageClick}
                    />
                </div>

                {/* Modal de edición de imagen */}
                {imageEditing && (
                    <div className="image-modal-overlay">
                        <div className="image-edit-popup">
                            <h3>Cambiar imagen</h3>
                            <input type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="form-input" />
                            <div className="btn-row">
                                <button onClick={saveImage} className="submit-btn">Guardar</button>
                                <button onClick={() => setImageEditing(false)} className="cancel-btn">Cancelar</button>
                            </div>
                            {savingField === 'url_imagen' && <small>Guardando...</small>}
                        </div>
                    </div>
                )}

                {/* Información principal */}
                <div className="user-info">
                    <h2>{userData.first_name} {userData.last_name}</h2>
                    <p><strong>Usuario:</strong> {userData.username}</p>
                    <label>
                        <strong>Nombre:</strong>
                        <input type="text" name="first_name" value={userData.first_name ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} className="form-input" />
                        {savingField === 'first_name' && <small>Guardando...</small>}
                    </label>
                    <br />
                    <label>
                        <strong>Apellido:</strong>
                        <input type="text" name="last_name" value={userData.last_name ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} className="form-input" />
                        {savingField === 'last_name' && <small>Guardando...</small>}
                    </label>
                    <p><strong>Correo:</strong> {userData.email}</p>
                    <p><strong>Rol:</strong> {roleName}</p>
                </div>

                {/* Información extra */}
                <div className="user-extra">
                    <label>
                        Peso (kg)
                        <input type="number" name="peso_kg" value={userData.peso_kg ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} />
                        {savingField === 'peso_kg' && <small>Guardando...</small>}
                    </label>
                    <label>
                        Altura (cm)
                        <input type="number" name="altura" value={userData.altura ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} />
                        {savingField === 'altura' && <small>Guardando...</small>}
                    </label>
                </div>

                {/* Botón de administrar perfiles: visible para superusers y staff */}
                {(isSuperuser || isStaff) && (
                    <div className="admin-administrar">
                        <button className="admin-btn" onClick={() => navigate('/administrar-perfiles')}>
                            Administrar Perfiles
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfile
