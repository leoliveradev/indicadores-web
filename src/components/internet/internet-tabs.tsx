"use client";

import { useState } from "react";

const TABS = [
  { key: "tecnologia", label: "Tecnología" },
  { key: "penetracion", label: "Penetración" },
  { key: "velocidad", label: "Velocidad" },
  { key: "ingresos", label: "Ingresos" },
];

export function InternetTabs() {
  const [active, setActive] = useState("tecnologia");

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${active === tab.key ? "active" : ""}`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div>
          {active === "tecnologia" && <div>Contenido tecnología</div>}
          {active === "penetracion" && <div>Contenido penetración</div>}
          {active === "velocidad" && <div>Contenido velocidad</div>}
          {active === "ingresos" && <div>Contenido ingresos</div>}
        </div>

      </div>
    </section>
  );
} 