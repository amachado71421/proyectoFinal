import React, { useState } from "react";
import '/src/Styles/QuienesSomos/LayerGrado.css';

const GRADOS = [
  { id: "10-9", label: "10º–9º kyu", belt: "Blanco", desc: "Principiante. Bases y cortes básicos." },
  { id: "8-7", label: "8º–7º kyu", belt: "Amarillo", desc: "Fundamentos y coordinación." },
  { id: "6",   label: "6º kyu",      belt: "Naranja", desc: "Movimientos combinados y más fuerza." },
  { id: "5-4", label: "5º–4º kyu",   belt: "Verde", desc: "Técnica intermedia y defensa." },
  { id: "3-2", label: "3º–2º kyu",   belt: "Azul", desc: "Táctica y formas más complejas." },
  { id: "1",   label: "1º kyu",      belt: "Café / Marrón", desc: "Último nivel antes del negro." },
  { id: "dan", label: "1º → 10º dan",belt: "Negro", desc: "Grados de maestro (dan). Contribución y tiempo)." }
];

export default function LayerGrados() {
  const [active, setActive] = useState(null);

  return (
    <section className="LayerGrados" aria-label="Niveles de Karate">
        <div className="GradosTitle">
      <h2 className="lg-title">Grados de Karate</h2>
      <img src="../src/Images/LayerQuienesSomos/LayerIconoQS.png" className="LayerIconoQS" alt="LayerIconoQS" />
</div>
      <div className="lg-buttons" role="toolbar" aria-label="Botones de grados">
        {GRADOS.map((g) => {
          const isActive = active === g.id;
          return (
            <button
              key={g.id}
              type="button"
              className={`lg-btn ${isActive ? "active" : ""}`}
              onClick={() => setActive(isActive ? null : g.id)}
              aria-pressed={isActive}
            >
              <span
                className="belt-dot"
                style={{ backgroundColor: beltColorHex(g.belt) }}
                aria-hidden="true"
              />
              <span className="btn-label">{g.label}</span>
            </button>
          );
        })}
      </div>

      <div className="lg-panel">
        {active ? (
          <GradoDetalle grado={GRADOS.find((g) => g.id === active)} />
        ) : (
          <div className="lg-placeholder">Selecciona un grado para ver detalles</div>
        )}
      </div>
    </section>
  );
}

function GradoDetalle({ grado }) {
  if (!grado) return null;
  return (
    <article className="grado-card" aria-live="polite">
      <div className="grado-header">
        <div className="grado-belt" style={{ backgroundColor: beltColorHex(grado.belt) }} />
        <div>
          <h3>{grado.label}</h3>
          <p className="grado-belt-name">{grado.belt}</p>
        </div>
      </div>
      <p className="grado-desc">{grado.desc}</p>
      <ul className="grado-meta">
        <li><strong>Tipo:</strong> {grado.id === "dan" ? "Dan (cinturón negro)" : "Kyu (grados de alumno)"}</li>
        <li><strong>Recomendación:</strong> Practicar kihon, kata y kumite según nivel</li>
      </ul>
    </article>
  );
}

/* Utility para mapear nombre de color a un hex (ajusta si quieres otros tonos) */
function beltColorHex(name) {
  switch ((name || "").toLowerCase()) {
    case "blanco": return "#ffffff";
    case "amarillo": return "#ffd43b";
    case "naranja": return "#ff8c42";
    case "verde": return "#3db24a";
    case "azul": return "#2b6fb6";
    case "café / marrón": return "#7a4b2a";
    case "negro": return "#111111";
    case "morado": return "#6a2e8a";
    default: return "#ccc";
  }
}
