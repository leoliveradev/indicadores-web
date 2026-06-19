"use client";

import { useState } from "react";
import { InternetTecnologia } from "@/components/internet/internet-tecnologia";
import {
  ApiResponse,
  InternetPenetracionProvinciaRow, InternetPenetracionRow,
  InternetTecnologiaProvinciaRow, InternetTecnologiaRow
} from "@/lib/types";
import { InternetPenetracion } from "@/components/internet/internet-penetracion";

const TABS = [
  { key: "tecnologia", label: "Tecnología" },
  { key: "penetracion", label: "Penetración" },
  { key: "velocidad", label: "Velocidad" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  tecnologias: ApiResponse<InternetTecnologiaRow>;
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
  penetracion: ApiResponse<InternetPenetracionRow>;
  penetracionProvincias: ApiResponse<InternetPenetracionProvinciaRow>;
};

export function InternetTabs({ 
  tecnologias, 
  tecnologiasProvincias, 
  penetracion, 
  penetracionProvincias 
}: Props) {
  
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

          {active === "penetracion" && (
            <InternetPenetracion
              penetracion={penetracion}
              penetracionProvincias={penetracionProvincias}
            />
          )}
          {active === "ingresos" && <div>Contenido ingresos</div>}
        </div>

      </div>
    </section>
  );
} 