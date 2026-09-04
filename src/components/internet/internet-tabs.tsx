"use client";

import { useState } from "react";
import { ApiResponse } from "@/lib/types";
import {
  InternetTecnologiaProvinciaRow, InternetTecnologiaRow,
  InternetAccesosVelocidadRow,
  InternetVelocidadMediaProvinciasRow, InternetVelocidadMediaRow,
  InternetPenetracionProvinciaRow, InternetPenetracionRow,
  InternetIngresosRow,
} from "@/lib/internet";

import { InternetTecnologia } from "@/components/internet/internet-tecnologia";
import { InternetAccesosVelocidad } from "@/components/internet/internet-accesos-velocidad";
import { InternetVelocidadMedia } from "@/components/internet/internet-velocidad-media";
import { InternetPenetracion } from "@/components/internet/internet-penetracion";
import { InternetIngresos } from "@/components/internet/internet-ingresos";

const TABS = [
  { key: "tecnologia", label: "Tecnología" },
  { key: "penetracion", label: "Penetración" },
  { key: "velocidadMedia", label: "Velocidad media" },
  { key: "accesosVelocidad", label: "Accesos por velocidad" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  tecnologias: ApiResponse<InternetTecnologiaRow>;
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
  accesosVelocidad: ApiResponse<InternetAccesosVelocidadRow>;
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>;
  velocidadMediaProvincias: ApiResponse<InternetVelocidadMediaProvinciasRow>;
  penetracion: ApiResponse<InternetPenetracionRow>;
  penetracionProvincias: ApiResponse<InternetPenetracionProvinciaRow>;
  ingresos: ApiResponse<InternetIngresosRow>;
};

export function InternetTabs({
  tecnologias,
  tecnologiasProvincias,
  accesosVelocidad,
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

        <div className="tabs-bar overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
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
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div>

          {active === "tecnologia" && (
            <InternetTecnologia
              tecnologias={tecnologias}
              tecnologiasProvincias={tecnologiasProvincias}
            />
          )}

          {active === "accesosVelocidad" && (
            <InternetAccesosVelocidad
              velocidades={accesosVelocidad}
            />
          )}

          {active === "velocidadMedia" && (
            <InternetVelocidadMedia
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

          {active === "ingresos" && (
            <InternetIngresos
              ingresos={ingresos}
            />
          )}
        </div>

      </div>
    </section>
  );
} 