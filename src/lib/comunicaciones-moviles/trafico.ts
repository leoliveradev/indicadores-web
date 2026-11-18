import type { KPIItem } from "@/components/home/kpi-section";
import type { ApiResponse } from "@/lib/types";

import {
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow,
} from "./types";

import { dispValue } from "@/lib/format";
import { ILlamadas, ISms, ITiempo } from "@/components/ui/icons";

export function getTraficoKPIItems(
  llamadas: ApiResponse<ComunicacionesMovilesLlamadasRow>,
  minutos: ApiResponse<ComunicacionesMovilesMinutosRow>,
  sms: ApiResponse<ComunicacionesMovilesSmsRow>
): KPIItem[] {
  const latestLlamadas =
    llamadas.data[llamadas.data.length - 1];

  const latestMinutos =
    minutos.data[minutos.data.length - 1];

  const latestSms =
    sms.data[sms.data.length - 1];

  return [
    {
      label: "Llamadas",
      icon: ILlamadas,
      value: latestLlamadas.total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Minutos",
      icon: ITiempo,
      value: latestMinutos.total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "SMS",
      icon: ISms,
      value: latestSms.sms,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}