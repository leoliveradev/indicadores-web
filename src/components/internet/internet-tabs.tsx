"use client";

import { useState } from "react";
import {  ApiResponse } from "@/lib/types";
import {
  InternetTecnologiaProvinciaRow, InternetTecnologiaRow,
  InternetVelocidadMediaProvinciasRow, InternetVelocidadMediaRow,
  InternetPenetracionProvinciaRow, InternetPenetracionRow,
  InternetIngresosRow
} from "@/lib/internet";

import { InternetTecnologia } from "@/components/internet/internet-tecnologia";
import { InternetVelocidad } from "@/components/internet/internet-velocidad";
import { InternetPenetracion } from "@/components/internet/internet-penetracion";
import { InternetIngresos } from "./internet-ingresos";

const TABS = [
  { key: "tecnologia", label: "Tecnología" },
  { key: "penetracion", label: "Penetración" },
  { key: "velocidad", label: "Velocidad" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  tecnologias: ApiResponse<InternetTecnologiaRow>;
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>;
  velocidadMediaProvincias: ApiResponse<InternetVelocidadMediaProvinciasRow>;
  penetracion: ApiResponse<InternetPenetracionRow>;
  penetracionProvincias: ApiResponse<InternetPenetracionProvinciaRow>;
  ingresos: ApiResponse<InternetIngresosRow>;
};

export function InternetTabs({
  tecnologias,
  tecnologiasProvincias,
  velocidadMedia,
  velocidadMediaProvincias,
  penetracion,
  penetracionProvincias,
  ingresos
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

          {active === "velocidad" && (
            <InternetVelocidad
              velocidadMedia={velocidadMedia}
              provincias={velocidadMediaProvincias}
            />
          )}

          {active === "penetracion" && (
            <InternetPenetracion
              penetracion={penetracion}
              penetracionProvincias={penetracionProvincias}
            />
          )}
          {active === "ingresos" && 
          (
            <InternetIngresos
              data={ingresos}
            />
          )}
        </div>

      </div>
    </section>
  );
} 