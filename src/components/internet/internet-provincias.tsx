"use client";

import { useState } from "react";

import { TecnologiaProvinciaView } from "./provincias/tecnologia-provincia-view";
import { PenetracionProvinciaView } from "./provincias/penetracion-provincia-view";
import { VelocidadMediaProvinciaView } from "./provincias/velocidad-media-provincia-view";

import type { ApiResponse } from "@/lib/types";

import type {
  InternetTecnologiaProvinciaRow,
  InternetVelocidadMediaProvinciasRow,
  InternetPenetracionProvinciaRow,
} from "@/lib/internet";

type Props = {
  tecnologias:
  ApiResponse<InternetTecnologiaProvinciaRow>;

  velocidadMedia:
  ApiResponse<InternetVelocidadMediaProvinciasRow>;

  penetracion:
  ApiResponse<InternetPenetracionProvinciaRow>;
};

export function InternetProvincias({
  tecnologias,
  velocidadMedia,
  penetracion,
}: Props) {
  const [view, setView] = useState<
    "tecnologia" |
    "velocidad" |
    "penetracion"
  >("tecnologia");

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Exploración provincial
        </h2>

        <div className="filter-toolbar">
          <div className="filter-group">
            <label className="filter-label">
              Indicador
            </label>

            <select
              value={view}
              onChange={(e) =>
                setView(
                  e.target.value as
                  | "tecnologia"
                  | "velocidad"
                  | "penetracion"
                )
              }
              className="filter-select"
            >
              <option value="tecnologia">
                Tecnología
              </option>

              <option value="velocidad">
                Velocidad media
              </option>

              <option value="penetracion">
                Penetración
              </option>
            </select>
          </div>
        </div>

        {view === "tecnologia" && (
          <TecnologiaProvinciaView
            tecnologiasProvincias={
              tecnologias
            }
          />
        )}

        {view === "velocidad" && (
          <VelocidadMediaProvinciaView
            provincias={velocidadMedia}
          />
        )}

        {view === "penetracion" && (
          <PenetracionProvinciaView
            penetracionProvincias={
              penetracion
            }
          />
        )}

      </div>
    </section>
  );
}