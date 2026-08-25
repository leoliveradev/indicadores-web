import type {
  ApiResponse,
} from "@/lib/types";

import type {
  ComunicacionesMovilesMinutosRow,
} from "./types";


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
