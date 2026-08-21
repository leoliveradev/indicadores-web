"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionAccesosRow,
  TelevisionAccesosProvinciaRow,
  TelevisionPenetracionRow,
  TelevisionPenetracionProvinciaRow,
  TelevisionIngresosRow,
} from "@/lib/television";

import { TelevisionAccesos }
  from "./television-accesos";

import { TelevisionPenetracion }
  from "./television-penetracion";

import { TelevisionIngresos }
  from "./television-ingresos";

const TABS = [
  { key: "accesos", label: "Accesos" },
  { key: "penetracion", label: "Penetración" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  accesos: ApiResponse<TelevisionAccesosRow>;
  accesosProvincias: ApiResponse<TelevisionAccesosProvinciaRow>;

  penetracion: ApiResponse<TelevisionPenetracionRow>;
  penetracionProvincias: ApiResponse<TelevisionPenetracionProvinciaRow>;

  ingresos: ApiResponse<TelevisionIngresosRow>;
};

export function TelevisionTabs({
  accesos,
  accesosProvincias,
  penetracion,
  penetracionProvincias,
  ingresos,
}: Props) {
  const [active, setActive] =
    useState("accesos");

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${active === tab.key
                  ? "active"
                  : ""
                }`}
              onClick={() =>
                setActive(tab.key)
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === "accesos" && (
          <TelevisionAccesos
            accesos={accesos}
            provincias={accesosProvincias}
          />
        )}

        {active === "penetracion" && (
          <TelevisionPenetracion
            penetracion={penetracion}
            provincias={penetracionProvincias}
          />
        )}

        {active === "ingresos" && (
          <TelevisionIngresos
            ingresos={ingresos}
          />
        )}

      </div>  
  </section>
  );
}