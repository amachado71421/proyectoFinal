import { useEffect, useState, useRef } from 'react';
import '/src/Styles/Pruebas.css';

async function silentFetch(url, options) {
    try {
        const res = await fetch(url, options);
        return res;
    } catch {
        return { ok: false, status: 0 };
    }
}

function hasAnyCookie() {
    return Boolean(document.cookie && document.cookie.trim() !== '');
}

const TokenRefresher = ({ onRefresh, onLogout, loggedOut }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (loggedOut) {
            setShowPrompt(false);
            clearInterval(intervalRef.current);
            return;
        }

        const checkSession = async () => {
            if (!hasAnyCookie()) {
                setShowPrompt(false);
                return;
            }

            const res = await silentFetch('http://localhost:8000/api/auth/me/', {
                method: 'GET',
                credentials: 'include',
            });

            if (res.status === 401) {
                setShowPrompt(true);
            } else if (res.ok) {
                setShowPrompt(false);
            } else {
                setShowPrompt(false);
            }
        };

        checkSession();
        intervalRef.current = setInterval(checkSession, 60 * 1000);

        return () => clearInterval(intervalRef.current);
    }, [loggedOut]);

    const handleExtendSession = async () => {
        if (!hasAnyCookie()) {
            setShowPrompt(false);
            return;
        }

        const res = await silentFetch('http://localhost:8000/api/auth/refresh/', {
            method: 'POST',
            credentials: 'include',
        });

        if (res.ok) {
            const checkRes = await silentFetch('http://localhost:8000/api/auth/me/', {
                method: 'GET',
                credentials: 'include',
            });

            if (checkRes.ok) {
                setShowPrompt(false);
                if (onRefresh) onRefresh();
            } else {
                setShowPrompt(true);
            }
        } else {
            setShowPrompt(true);
        }
    };

    const handleLogout = () => {
        clearInterval(intervalRef.current);
        setShowPrompt(false);
        if (onLogout) onLogout();
        window.location.href = '/loginregister';
    };

    if (loggedOut || !showPrompt) return null;

    return (
        <div className="divPerfil">
            <p>Tu sesión está por expirar o es inválida. ¿Quieres extender la sesión?</p>
            <button onClick={handleExtendSession}>Sí, extender sesión</button>
            <button onClick={handleLogout}>No, cerrar sesión</button>
        </div>
    );
};

export default TokenRefresher;
