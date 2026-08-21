import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalProvinciaRow,
} from "./types";

export function getProvinciaRankingData(
  response: ApiResponse<MercadoPostalProvinciaRow>
) {
  return [...response.data]
    .sort((a, b) => b.pesos - a.pesos)
    .slice(0, 10)
    .map((row) => ({
      provincia: row.provincia,
      pesos: row.pesos,
      unidades: row.unidades,
    }));
}

export function getProvinciaMapData(
  response: ApiResponse<MercadoPostalProvinciaRow>
) {
  return response.data.map((row) => ({
    provincia: row.provincia,

    total: row.pesos,

    pesos: row.pesos,
    unidades: row.unidades,
  }));
}