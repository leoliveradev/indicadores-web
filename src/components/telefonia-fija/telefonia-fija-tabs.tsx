"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaAccesosRow,
  TelefoniaFijaAccesosProvinciaRow,
  TelefoniaFijaPenetracionRow,
  TelefoniaFijaPenetracionProvinciaRow,
  TelefoniaFijaIngresosRow,
} from "@/lib/telefonia-fija";

import { TelefoniaFijaAccesos } from "./telefonia-fija-accesos";
import { TelefoniaFijaPenetracion } from "./telefonia-fija-penetracion";
import { TelefoniaFijaIngresos } from "./telefonia-fija-ingresos";

const TABS = [
  { key: "accesos", label: "Accesos" },
  { key: "penetracion", label: "Penetración" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  accesos: ApiResponse<TelefoniaFijaAccesosRow>;
  accesosProvincias: ApiResponse<TelefoniaFijaAccesosProvinciaRow>;

  penetracion: ApiResponse<TelefoniaFijaPenetracionRow>;
  penetracionProvincias: ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;

  ingresos: ApiResponse<TelefoniaFijaIngresosRow>;
};

export function TelefoniaFijaTabs({
  accesos,
  accesosProvincias,
  penetracion,
  penetracionProvincias,
  ingresos,
}: Props) {
  const [active, setActive] = useState("accesos");

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${
                active === tab.key ? "active" : ""
              }`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

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