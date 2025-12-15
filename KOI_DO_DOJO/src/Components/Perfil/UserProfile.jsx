import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import '/src/Styles/UserProfile.css'
import Palmares from './Palmares'
import Logros from './Logros'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const USERS_ENDPOINT = `${API_URL}/api/perfiles/`
const ME_ENDPOINT = `${API_URL}/api/auth/me/`
const DEFAULT_IMAGE = '/src/Images/Imagen_perfil_default.jpg'

function UserProfile() {
    const navigate = useNavigate()
    const { user, userLoading } = useContext(AuthContext)

    const [userData, setUserData] = useState(null)
    const [originalData, setOriginalData] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [error, setError] = useState('')
    const [roleData, setRoleData] = useState(null)
    const [savingField, setSavingField] = useState(null)
    const [imageEditing, setImageEditing] = useState(false)
    const [newImageUrl, setNewImageUrl] = useState('')
    const [imageError, setImageError] = useState(false)

    // 🔐 nonce persistente por sesión → evita bloqueo de Google Drive
    const driveNonce = useRef(Date.now())

    /* ============================
       HELPERS
    ============================ */
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

    const extractDriveId = (url) => {
        if (!url) return null
        const match = url.match(/[-\w]{25,}/)
        return match ? match[0] : null
    }

    const normalizeImageUrl = (url) => {
        if (!url) return DEFAULT_IMAGE

        const driveId = extractDriveId(url)
        if (driveId) {
            return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000&v=${driveNonce.current}`
        }

        return url
    }

    /* ============================
       CARGA INICIAL (una sola vez)
    ============================ */
    useEffect(() => {
        const hasReloaded = sessionStorage.getItem('profileReloaded')
        if (!hasReloaded) {
            sessionStorage.setItem('profileReloaded', 'true')
            window.location.reload()
        }
    }, [])

    /* ============================
       CARGAR PERFIL
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
                setImageError(false)

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
       UPDATE PERFIL
    ============================ */
    const updateProfile = async (patch) => {
        const id = userData?.id_perfil ?? userData?.id
        if (!id) return

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
            if (!res.ok) {
                setError(data.detail || 'Error al guardar')
                return
            }

            setUserData(prev => ({ ...prev, ...data }))
            setOriginalData(prev => ({ ...prev, ...data }))
            setImageError(false)
            setError('')
        } catch {
            setError('Error de conexión')
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
        if (value === originalValue) return
        await updateProfile({ [name]: value })
    }

    const handleImageClick = () => {
        setNewImageUrl(userData?.url_imagen || '')
        setImageEditing(true)
    }

    const saveImage = async () => {
        if (!newImageUrl || newImageUrl === userData?.url_imagen) {
            setImageEditing(false)
            return
        }
        await updateProfile({ url_imagen: newImageUrl })
        setImageEditing(false)
    }

    /* ============================
       RENDER
    ============================ */
    if (userLoading || loadingProfile) return <div>Cargando perfil...</div>
    if (error) return <div style={{ color: 'red' }}>{error}</div>
    if (!userData) return null

    const roleName = roleData?.nombre_rol || 'Sin rol'
    const isSuperuser = !!user?.is_superuser
    const isStaff = !!user?.is_staff

    const imageSrc = imageError
        ? DEFAULT_IMAGE
        : normalizeImageUrl(userData.url_imagen)

    return (
        <div className="div-perfil">
            <div className="user-card">

                {/* IMAGEN */}
                <div className="user-image">
                    <img
                        src={imageSrc}
                        alt="Foto perfil"
                        onClick={handleImageClick}
                        onError={() => setImageError(true)}
                    />
                </div>

                {/* MODAL IMAGEN */}
                {imageEditing && (
                    <div className="image-modal-overlay">
                        <div className="image-edit-popup">
                            <h3>Cambiar imagen</h3>
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                className="form-input"
                            />
                            <div className="btn-row">
                                <button onClick={saveImage} className="submit-btn">Guardar</button>
                                <button onClick={() => setImageEditing(false)} className="cancel-btn">Cancelar</button>
                            </div>
                            {savingField === 'url_imagen' && <small>Guardando...</small>}
                        </div>
                    </div>
                )}

                {/* INFO */}
                <div className="user-info">
                    <h2>{userData.first_name} {userData.last_name}</h2>
                    <p><strong>Usuario:</strong> {userData.username}</p>

                    <label>
                        <strong>Nombre:</strong>
                        <input className="form-input" name="first_name" value={userData.first_name ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} />
                        {savingField === 'first_name' && <small>Guardando...</small>}
                    </label>

                    <label>
                        <strong>Apellido:</strong>
                        <input className="form-input" name="last_name" value={userData.last_name ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} />
                        {savingField === 'last_name' && <small>Guardando...</small>}
                    </label>

                    <p><strong>Correo:</strong> {userData.email}</p>
                    <p><strong>Rol:</strong> {roleName}</p>
                </div>

                {/* EXTRA */}
                <div className="user-extra">
                    <label>
                        Peso (kg)
                        <input type="number" name="peso_kg" value={userData.peso_kg ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} />
                    </label>
                    <label>
                        Altura (cm)
                        <input type="number" name="altura" value={userData.altura ?? ''} onChange={handleFieldChange} onBlur={handleFieldBlur} />
                    </label>
                </div>

                {/* STATS */}
                <div className="user-stats">
                    <div className="user-logros"><Logros /></div>
                    <div className="user-palmares"><Palmares /></div>
                </div>

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
