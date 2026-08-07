import { dispValue } from "@/lib/format";
import {  ApiResponse } from "@/lib/types";
import type {
  InternetTecnologiaRow,
  InternetTecnologiaProvinciaRow
} from "@/lib/internet/types";

import type { KPIItem } from "@/components/home/kpi-section";

import { TECH_CONFIG, TECH_CONFIG_KPI } from "@/lib/constants/internet";

import { buildDonutData, getTopN } from "./common";

export function getTecnologiaDonutData(
  response: ApiResponse<InternetTecnologiaRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const cur = rows[rows.length - 1];

  return buildDonutData(cur, TECH_CONFIG);
}

export function getTecnologiaKPIItems(
  response: ApiResponse<InternetTecnologiaRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const cur = rows[rows.length - 1];

  return TECH_CONFIG_KPI.map((t) => ({
    label: t.label,
    icon: () => null, // iconos específicos
    value: cur[t.key],
    format: (v: number) => dispValue(v, { format: "compact" }),
  }));
}



export function getTecnologiaEvolutionData(
  response: ApiResponse<InternetTecnologiaRow>
) {
  const rows = response.data;

  return rows.map((row) => ({
    label: `${row.anio} T${row.trimestre}`, // eje X
    adsl: row.adsl,
    cablemodem: row.cablemodem,
    fibra_optica: row.fibra_optica,
    wireless: row.wireless,
  }));
}


export function getTecnologiaProvinciaRankingData(
  response: ApiResponse<InternetTecnologiaProvinciaRow>
) {
  const topRows = getTopN(
    response.data,
    (r) => r.total
  );
  return topRows
}
