import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalProvinciaRow,
} from "./types";

import {
  dispCurrency,
} from "@/lib/format";

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
  return response.data.map(
    (row) => ({
      provincia:
        row.provincia,

      total:
        row.pesos,

      tooltipData: [
        {
          label:
            "Facturación",

          value:
            dispCurrency(
              row.pesos
            ),

          color:
            "#005297",
        },
        {
          label:
            "Producción",

          value:
            row.unidades.toLocaleString(
              "es-AR"
            ),

          color:
            "#22c55e",
        },
      ],
    })
  );
}