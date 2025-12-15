import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

import CrearRoles from './CrearRoles';
import AsignarRol from './AsignarRol';
import CrearLogros from './CrearLogros';
import AsignarLogro from './AsignarLogro';
import AdministradorPalmares from './AdministradorPalmares';
import AdministrarResultados from './AdministrarResultados';
import PromoverUsuarios from './PromoverUsuarios';

import '../../Styles/AdministrarPerfiles.css';

const AdministrarPerfiles = () => {
    const navigate = useNavigate();
    const { user, userLoading } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('roles');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownDirection, setDropdownDirection] = useState('down');
    const wrapperRef = useRef(null);

    // Definición de todas las pestañas
    const allTabs = [
        { id: 'roles', label: 'Gestionar Roles', component: CrearRoles },
        { id: 'asignar-roles', label: 'Asignar Roles', component: AsignarRol },
        { id: 'crear-logros', label: 'Crear Logros', component: CrearLogros },
        { id: 'asignar-logros', label: 'Asignar Logros', component: AsignarLogro },
        { id: 'palmares', label: 'Administrar Palmares', component: AdministradorPalmares },
        { id: 'resultados', label: 'Administrar Resultados', component: AdministrarResultados },
        { id: 'promover', label: 'Promover Usuarios', component: PromoverUsuarios },
    ];

    // 🔒 Filtrado de pestañas según rol
    const isSuperuser = !!user?.is_superuser;
    const isStaff = !!user?.is_staff;

    const tabs = allTabs.filter(tab => {
        if (isSuperuser) return true; // Admin ve todo
        if (isStaff) {
            // Staff solo ve logros y palmarés
            return tab.id === 'asignar-logros' || tab.id === 'palmares';
        }
        return false; // Otros usuarios no ven nada
    });

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

    // 🚀 Mantener scroll arriba al cambiar pestaña
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    // Detecta si el dropdown debe abrir arriba o abajo
    useEffect(() => {
        if (dropdownOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - rect.bottom;
            const spaceAbove = rect.top;
            setDropdownDirection(spaceBelow < 200 && spaceAbove > spaceBelow ? 'up' : 'down');
        }
    }, [dropdownOpen]);

    // 🔒 Redirigir si no es admin ni staff
    useEffect(() => {
        if (!userLoading && !isSuperuser && !isStaff) {
            navigate('/perfil'); // Redirige al perfil si no tiene permisos
        }
    }, [userLoading, isSuperuser, isStaff, navigate]);

    if (userLoading) return <div>Cargando...</div>; // Espera a AuthContext

    return (
        <div className="administrar-perfiles">
            <button className="volver-btn" onClick={() => navigate('/perfil')}>
                ← Volver al Perfil
            </button>

            <div className="admin-header">
                <h1>Administración de Perfiles, Logros y Palmares</h1>
                <p>Gestiona usuarios, roles, logros y estadísticas del dojo</p>
            </div>

            <div className="tabs-container">
                {/* TABS HEADER - Desktop */}
                <div className="tabs-header">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* CUSTOM DROPDOWN - Mobile */}
                <div className="tabs-select-wrapper" ref={wrapperRef}>
                    <div
                        className="tabs-select-btn"
                        onClick={() => setDropdownOpen(prev => !prev)}
                    >
                        {tabs.find(tab => tab.id === activeTab)?.label || 'Selecciona'}
                    </div>
                    {dropdownOpen && (
                        <ul className={`tabs-select-options ${dropdownDirection}`}>
                            {tabs.map(tab => (
                                <li
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {tab.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Contenido dinámico */}
                <div className="tab-content">
                    {ActiveComponent && <ActiveComponent />}
                </div>
            </div>
        </div>
    );
};

export default AdministrarPerfiles;
