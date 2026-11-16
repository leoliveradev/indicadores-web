"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionAccesosProvinciaRow,
  TelevisionPenetracionProvinciaRow,
} from "@/lib/television";

import {
  AccesosProvinciaView,
} from "./provincias/accesos-provincia-view";

import {
  PenetracionProvinciaView,
} from "./provincias/penetracion-provincia-view";

export type TelevisionProvinciaView =
  | "accesos"
  | "penetracion";

type Props = {
  accesos: ApiResponse<TelevisionAccesosProvinciaRow>;
  penetracion: ApiResponse<TelevisionPenetracionProvinciaRow>;
};

export function TelevisionProvincias({
  accesos,
  penetracion,
}: Props) {
  const [view, setView] = useState<
    "accesos" | "penetracion"
  >("accesos");

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