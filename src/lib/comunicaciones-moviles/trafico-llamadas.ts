import type {
  ApiResponse,
} from "@/lib/types";

import type {
  ComunicacionesMovilesLlamadasRow
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

