import type {
  ApiResponse,
} from "@/lib/types";

import type {
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow,
} from "./types";

export function getLlamadasEvolutionData(
  response: ApiResponse<ComunicacionesMovilesLlamadasRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    prepago: row.prepago,
    pospago: row.pospago,
    total: row.total,
  }));
}

export function getMinutosEvolutionData(
  response: ApiResponse<ComunicacionesMovilesMinutosRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    prepago: row.prepago,
    pospago: row.pospago,
    total: row.total,
  }));
}

export function getSmsEvolutionData(
  response: ApiResponse<ComunicacionesMovilesSmsRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    sms: row.sms,
  }));
}