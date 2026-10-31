"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type { Overview }
  from "@/lib/home/types";

import type {
  TelefoniaFijaAccesosRow,
  TelefoniaFijaAccesosProvinciaRow,
  TelefoniaFijaPenetracionRow,
  TelefoniaFijaPenetracionProvinciaRow,
  TelefoniaFijaIngresosRow,
} from "@/lib/telefonia-fija";

import { TelefoniaFijaResumen } from "./telefonia-fija-resumen";
import { TelefoniaFijaAccesos } from "./telefonia-fija-accesos";
import { TelefoniaFijaPenetracion } from "./telefonia-fija-penetracion";
import { TelefoniaFijaIngresos } from "./telefonia-fija-ingresos";

const TABS = [
  { key: "resumen", label: "Resumen" },
  { key: "accesos", label: "Accesos" },
  { key: "penetracion", label: "Penetración" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  overview: Overview;
  accesos: ApiResponse<TelefoniaFijaAccesosRow>;
  accesosProvincias: ApiResponse<TelefoniaFijaAccesosProvinciaRow>;
  penetracion: ApiResponse<TelefoniaFijaPenetracionRow>;
  penetracionProvincias: ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
  ingresos: ApiResponse<TelefoniaFijaIngresosRow>;
};

export function TelefoniaFijaTabs({
  overview,
  accesos,
  accesosProvincias,
  penetracion,
  penetracionProvincias,
  ingresos,
}: Props) {
  const [active, setActive] =
    useState("resumen");

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${active === tab.key ? "active" : ""
                }`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === "resumen" && (
          <TelefoniaFijaResumen
            overview={overview}
            accesos={accesos}
          />
        )}

        {active === "accesos" && (
          <TelefoniaFijaAccesos
            accesos={accesos}
            provincias={accesosProvincias}
          />
        )}

        {active === "penetracion" && (
          <TelefoniaFijaPenetracion
            penetracion={penetracion}
            provincias={penetracionProvincias}
          />
        )}

        {active === "ingresos" && (
          <TelefoniaFijaIngresos
            ingresos={ingresos}
          />
        )}

      </div>
    </section>
  );
}