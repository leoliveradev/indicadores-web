"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaAccesosProvinciaRow,
  TelefoniaFijaPenetracionProvinciaRow,
} from "@/lib/telefonia-fija";

import {
  AccesosProvinciaView,
} from "./provincias/accesos-provincia-view";

import {
  PenetracionProvinciaView,
} from "./provincias/penetracion-provincia-view";

type Props = {
  accesos:
    ApiResponse<TelefoniaFijaAccesosProvinciaRow>;

  penetracion:
    ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
};

export function TelefoniaFijaProvincias({
  accesos,
  penetracion,
}: Props) {

  const [view, setView] = useState<
    "accesos" |
    "penetracion"
  >("accesos");

  return (
    <>
      <section className="section-wrap">
        <div className="section-inner">

          <div className="filter-group">

            <label className="filter-label">
              Indicador
            </label>

            <select
              className="filter-select"
              value={view}
              onChange={(e) =>
                setView(
                  e.target.value as
                    | "accesos"
                    | "penetracion"
                )
              }
            >
              <option value="accesos">
                Accesos
              </option>

              <option value="penetracion">
                Penetración
              </option>
            </select>

          </div>

        </div>
      </section>

      {view === "accesos" && (
        <AccesosProvinciaView
          provincias={accesos}
        />
      )}

      {view === "penetracion" && (
        <PenetracionProvinciaView
          provincias={penetracion}
        />
      )}
    </>
  );
}