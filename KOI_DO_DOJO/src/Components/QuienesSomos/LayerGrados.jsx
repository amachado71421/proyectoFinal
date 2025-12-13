import React, { useState, useEffect } from "react";
import '/src/Styles/QuienesSomos/LayerGrado.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const LOGROS_ENDPOINT = `${API_URL}/api/logros/con_usuarios/`;

const GRADOS = [
  { nombre: "mo kyu" },
  { nombre: "10 kyu", color: "naranja" },
  { nombre: "9 kyu", color: "redish" },
  { nombre: "8 kyu", color: "celeste" },
  { nombre: "7 kyu", color: "azul" },
  { nombre: "6 kyu", color: "amarillo" },
  { nombre: "5 kyu", color: "morado" },
  { nombre: "4 kyu", color: "verde claro" },
  { nombre: "3 kyu", color: "verde oscuro" },
  { nombre: "2 kyu", color: "cafe claro" },
  { nombre: "1 kyu", color: "cafe oscuro" },
  { nombre: "Primer Dan", color: "negro" },
  { nombre: "Segundo Dan", color: "negro" },
  { nombre: "Tercer Dan", color: "negro" },
  { nombre: "Cuarto Dan", color: "negro" },
  { nombre: "Quinto Dan", color: "negro" },
  { nombre: "Sexto Dan", color: "negro" },
  { nombre: "Séptimo Dan", color: "negro" },
  { nombre: "Octavo Dan", color: "negro" },
  { nombre: "Noveno Dan", color: "negro" },
  { nombre: "Décimo Dan", color: "negro" },
];

export default function LayerGrados() {
  const [active, setActive] = useState(null);
  const [logros, setLogros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogros = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(LOGROS_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Error cargando logros: HTTP ${response.status}`);
        }
        const data = await response.json();
        const allLogros = Array.isArray(data) ? data : data.results || [];
        setLogros(allLogros);
      } catch (err) {
        console.error('Error al cargar logros:', err);
        setError('Error al cargar logros.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogros();
  }, []);

  const availableGrados = GRADOS.filter(grado =>
    logros.some(logro => logro.nombre_logro === grado.nombre)
  );

  if (loading) {
    return (
      <section className="LayerGrados" aria-label="Niveles de Karate">
        <div className="GradosTitle">
          <h2 className="lg-title">Grados de Karate</h2>
          <img src="../src/Images/LayerQuienesSomos/LayerIconoQS.png" className="LayerIconoQS" alt="LayerIconoQS" />
        </div>
        <div style={{ color: '#666' }}>Cargando grados...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="LayerGrados" aria-label="Niveles de Karate">
        <div className="GradosTitle">
          <h2 className="lg-title">Grados de Karate</h2>
          <img src="../src/Images/LayerQuienesSomos/LayerIconoQS.png" className="LayerIconoQS" alt="LayerIconoQS" />
        </div>
        <div style={{ color: 'red', fontSize: 14 }}>{error}</div>
      </section>
    );
  }

  return (
    <section className="LayerGrados" aria-label="Niveles de Karate">
        <div className="GradosTitle">
      <h2 className="lg-title">Grados de Karate</h2>
      <img src="../src/Images/LayerQuienesSomos/LayerIconoQS.png" className="LayerIconoQS" alt="LayerIconoQS" />
</div>
      <div className="lg-buttons" role="toolbar" aria-label="Botones de grados">
        {availableGrados.map((g) => {
          const isActive = active === g.nombre;
          return (
            <button
              key={g.nombre}
              type="button"
              className={`lg-btn ${isActive ? "active" : ""}`}
              onClick={() => setActive(isActive ? null : g.nombre)}
              aria-pressed={isActive}
            >
              <span
                className="belt-dot"
                style={{ backgroundColor: g.color ? beltColorHex(g.color) : 'transparent' }}
                aria-hidden="true"
              />
              <span className="btn-label">{g.nombre}</span>
            </button>
          );
        })}
      </div>

      <div className="lg-panel">
        {active ? (
          <GradoDetalle grado={availableGrados.find((g) => g.nombre === active)} logros={logros} />
        ) : (
          <div className="lg-placeholder">Selecciona un grado para ver detalles</div>
        )}
      </div>
    </section>
  );
}

function GradoDetalle({ grado, logros }) {
  if (!grado) return null;
  const isDan = grado.nombre.includes("Dan");
  const beltColor = grado.color || (isDan ? "negro" : "blanco");
  const beltName = grado.color ? grado.color : (isDan ? "Negro" : "Blanco");
  const tipo = isDan ? "Dan (cinturón negro)" : "Kyu (grados de alumno)";

  // Filtrar logros que coincidan con el nombre del grado
  const logrosDelGrado = logros.filter(logro => logro.nombre_logro === grado.nombre);

  // Obtener usuarios únicos de esos logros
  const usuarios = [];
  logrosDelGrado.forEach(logro => {
    if (logro.usuarios && Array.isArray(logro.usuarios)) {
      logro.usuarios.forEach(usuario => {
        if (!usuarios.some(u => u.id === usuario.id)) {
          usuarios.push(usuario);
        }
      });
    }
  });

  return (
    <article className="grado-card" aria-live="polite">
      <div className="grado-header">
        <div className="grado-belt" style={{ backgroundColor: beltColorHex(beltColor) }} />
        <div>
          <h3>{grado.nombre}</h3>
          <p className="grado-belt-name">{beltName}</p>
        </div>
      </div>
      <ul className="grado-meta">
        <li><strong>Tipo:</strong> {tipo}</li>
        <li><strong>Recomendación:</strong> Practicar kihon, kata y kumite según nivel</li>
      </ul>
      {usuarios.length > 0 && (
        <div className="grado-usuarios">
          <h4>Usuarios con este grado:</h4>
          <div className="usuarios-horizontal-list">
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="usuario-item">
                {usuario.nombre || usuario.username || `Usuario ${usuario.id}`}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

/* Utility para mapear nombre de color a un hex (ajusta si quieres otros tonos) */
function beltColorHex(name) {
  switch ((name || "").toLowerCase()) {
    case "blanco": return "#ffffff";
    case "amarillo": return "#ffd43b";
    case "naranja": return "#ff8c42";
    case "redish": return "#ff6b6b";
    case "celeste": return "#87ceeb";
    case "azul": return "#2b6fb6";
    case "morado": return "#6a2e8a";
    case "verde claro": return "#90ee90";
    case "verde oscuro": return "#228b22";
    case "cafe claro": return "#d2b48c";
    case "cafe oscuro": return "#7a4b2a";
    case "negro": return "#111111";
    default: return "#ccc";
  }
}
