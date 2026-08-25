"use client";

import { useState } from "react";

import type {
  ApiResponse
} from "@/lib/types";
import type {
  ComunicacionesMovilesAccesosRow,
  ComunicacionesMovilesPenetracionRow,
  ComunicacionesMovilesIngresosRow,
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow,
} from "@/lib/comunicaciones-moviles/types";

import { ComunicacionesMovilesAccesos }
  from "./comunicaciones-moviles-accesos";
import { ComunicacionesMovilesPenetracion }
  from "./comunicaciones-moviles-penetracion";
import { ComunicacionesMovilesTrafico }
  from "./comunicaciones-moviles-trafico";
import { ComunicacionesMovilesIngresos }
  from "./comunicaciones-moviles-ingresos";

type TabKey =
  | "accesos"
  | "penetracion"
  | "trafico"
  | "ingresos";

const TABS: {
  key: TabKey;
  label: string;
}[] = [
    { key: "accesos", label: "Accesos", },
    { key: "penetracion", label: "Penetración", },
    { key: "trafico", label: "Tráfico" },
    { key: "ingresos", label: "Ingresos", },
  ];


type Props = {
  accesos: ApiResponse<ComunicacionesMovilesAccesosRow>;
  penetracion: ApiResponse<ComunicacionesMovilesPenetracionRow>;
  ingresos: ApiResponse<ComunicacionesMovilesIngresosRow>;
  llamadas: ApiResponse<ComunicacionesMovilesLlamadasRow>;
  minutos: ApiResponse<ComunicacionesMovilesMinutosRow>;
  sms: ApiResponse<ComunicacionesMovilesSmsRow>;
};

export function ComunicacionesMovilesTabs({
  accesos,
  penetracion,
  ingresos,
  llamadas,
  minutos,
  sms,
}: Props) {

  const [active, setActive] =
    useState<TabKey>("accesos");

  return (
    <>
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

        </div>
      </section>

      {active === "accesos" && (
        <ComunicacionesMovilesAccesos
          accesos={accesos}
        />
      )}

      {/* Próximos componentes */}

      {active === "penetracion" && (
        <div className="section-wrap">
          <div className="section-inner">
            <ComunicacionesMovilesPenetracion
              penetracion={penetracion}
            />
          </div>
        </div>
      )}

      {active === "trafico" && (
        <ComunicacionesMovilesTrafico
          llamadas={llamadas}
          minutos={minutos}
          sms={sms}
        />
      )}

      {active === "ingresos" && (
        <div className="section-wrap">
          <div className="section-inner">
            <ComunicacionesMovilesIngresos
              ingresos={ingresos}
            />
          </div>
        </div>
      )}
    </>
  );
}