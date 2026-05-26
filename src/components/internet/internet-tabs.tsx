"use client";

import { useState } from "react";
import { InternetTecnologia } from "@/components/internet/internet-tecnologia";
import { ApiResponse, InternetTecnologiaProvinciaRow, InternetTecnologiaRow } from "@/lib/types";

const TABS = [
  { key: "tecnologia", label: "Tecnología" },
  { key: "penetracion", label: "Penetración" },
  { key: "velocidad", label: "Velocidad" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  tecnologias: ApiResponse<InternetTecnologiaRow>;
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
};

export function InternetTabs({ tecnologias, tecnologiasProvincias }: Props) {
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
          <div>

            {active === "tecnologia" && (
              <InternetTecnologia
                tecnologias={tecnologias}
                tecnologiasProvincias={tecnologiasProvincias}
              />
            )}

          </div>

          {active === "velocidad" && <div>Contenido velocidad</div>}
          {active === "penetracion" && <div>Contenido penetración</div>}
          {active === "ingresos" && <div>Contenido ingresos</div>}
        </div>

      </div>
    </section>
  );
} 