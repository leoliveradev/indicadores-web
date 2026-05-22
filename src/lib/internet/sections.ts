import { IInternet, IVelocidad, IDinero } from "@/components/ui/icons";
import { dispValue, dispCurrencyCompact } from "@/lib/format";
import type { InternetTecnologiaRow, Overview, InternetVelocidadMediaRow, ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { TECH_CONFIG, TECH_CONFIG_KPI } from "@/lib/constants/internet";

import { trendPct } from "@/lib/utilsInternet";

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


export function getInternetOverviewItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Accesos totales",
      icon: IInternet,
      value: data.accesos.internet,
      format: (v) => dispValue(v, { format: "compact" }),
    },
    // {
    //   label: "% Fibra",
    //   icon: IInternet,
    //   value: data.miscelaneas.fibra_pct,
    //   format: (v) => dispValue(v, { suffix: "%", decimals: 1 }),
    // },
    {
      label: "Penetración hogares",
      icon: IInternet,
      value: data.penetracion.internet,
      format: (v) => dispValue(v, {
        multiline: true,
        suffix: "c/100 hogares",
      }),
    },
    {
      label: "Velocidad media",
      icon: IVelocidad,
      value: data.miscelaneas.velocidad_mbps,
      format: (v) => dispValue(v, { decimals: 1, suffix: "Mbps" }),
    },
    {
      label: "Ingresos",
      icon: IDinero,
      value: data.ingresos.internet,
      format: (v) => dispCurrencyCompact(v),
    },
  ];
}

export function getTecnologiaDonutData(
  response: ApiResponse<InternetTecnologiaRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const cur = rows[rows.length - 1];

  return TECH_CONFIG.map((t) => ({
    name: t.label,
    value: cur[t.key] ?? 0,
    color: t.color,
  }));
}


export function getVelocidadGaugeData(
  response: ApiResponse<InternetVelocidadMediaRow>
) {
  const rows = Array.isArray(response)
    ? response
    : response?.data ?? [];

  if (!rows.length) return null;

  const cur = rows[rows.length - 1];
  const prev = rows.length > 1 ? rows[rows.length - 2] : null;

  // 🔥 fallback robusto
  const value =
    cur.Mbps ??
    0;

  const prevValue =
    prev?.Mbps ??
    null;

  return {
    value,
    trend: prevValue ? trendPct(value, prevValue) : null,
  };
}