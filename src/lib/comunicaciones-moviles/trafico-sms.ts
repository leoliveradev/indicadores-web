import type {
  ApiResponse,
} from "@/lib/types";

import type {
  ComunicacionesMovilesSmsRow,
} from "./types";


export function getSmsEvolutionData(
  response: ApiResponse<ComunicacionesMovilesSmsRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    sms: row.sms,
  }));
}