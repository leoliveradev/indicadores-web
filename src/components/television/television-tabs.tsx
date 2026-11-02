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

import type { Overview }
  from "@/lib/home/types";

import {
  TelevisionResumen,
} from "./television-resumen";

import { TelevisionAccesos }
  from "./television-accesos";

import { TelevisionPenetracion }
  from "./television-penetracion";

import { TelevisionIngresos }
  from "./television-ingresos";


const TABS = [
  { key: "resumen", label: "Resumen" },
  { key: "accesos", label: "Accesos" },
  { key: "penetracion", label: "Penetración" },
  { key: "ingresos", label: "Ingresos" },
];

type Props = {
  overview: Overview;
  accesos: ApiResponse<TelevisionAccesosRow>;
  accesosProvincias: ApiResponse<TelevisionAccesosProvinciaRow>;
  penetracion: ApiResponse<TelevisionPenetracionRow>;
  penetracionProvincias: ApiResponse<TelevisionPenetracionProvinciaRow>;
  ingresos: ApiResponse<TelevisionIngresosRow>;
};

export function TelevisionTabs({
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

        {active === "resumen" && (
          <TelevisionResumen
            overview={overview}
            accesos={accesos}
          />
        )}

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