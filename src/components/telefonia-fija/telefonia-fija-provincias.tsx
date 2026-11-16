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

export type TelefoniaFijaProvinciaView =
  | "accesos"
  | "penetracion";

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

  const [view, setView] =
    useState<TelefoniaFijaProvinciaView>(
      "accesos"
    );

  return (
    <>
      {view === "accesos" && (
        <AccesosProvinciaView
          provincias={accesos}
          view={view}
          onViewChange={setView}
        />
      )}

      {view === "penetracion" && (
        <PenetracionProvinciaView
          provincias={penetracion}
          view={view}
          onViewChange={setView}
        />
      )}
    </>
  );
}