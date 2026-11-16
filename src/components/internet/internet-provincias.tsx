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

export type InternetProvinciaView =
  | "tecnologia"
  | "velocidad"
  | "penetracion";

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
  const [view, setView] =
    useState<InternetProvinciaView>(
      "tecnologia"
    );

  return (
    <>
      {view === "tecnologia" && (
        <TecnologiaProvinciaView
          tecnologiasProvincias={tecnologias}
          view={view}
          onViewChange={setView}
        />

      )}

      {view === "velocidad" && (
        <VelocidadMediaProvinciaView
          provincias={velocidadMedia}
          view={view}
          onViewChange={setView}
        />
      )}

      {view === "penetracion" && (
        <PenetracionProvinciaView
          penetracionProvincias={penetracion}
          view={view}
          onViewChange={setView}
        />
      )}

    </>
  );
}