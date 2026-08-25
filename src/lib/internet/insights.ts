import type { Insight } from "@/lib/types";

import type {
  InternetVelocidadMediaRow,
  InternetTecnologiaRow,
  InternetPenetracionRow,
  InternetIngresosRow
} from "./types";

export function getVelocidadInsights(
  rows: InternetVelocidadMediaRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const growth =
    ((latest.Mbps - first.Mbps) /
      first.Mbps) *
    100;

  const peak = Math.max(
    ...rows.map((r) => r.Mbps)
  );

  const insights: Insight[] = [];

  insights.push({
    title: "Crecimiento histórico",
    text: `La velocidad media aumentó ${growth.toFixed(
      1
    )}% respecto del inicio de la serie.`,
  });

  if (latest.Mbps === peak) {
    insights.push({
      title: "Máximo histórico",
      text: "El último período registra la mayor velocidad de toda la serie.",
      severity: "success",
    });
  }

  return insights;
}

export function getTecnologiaInsights(
  rows: InternetTecnologiaRow[]
): Insight[] {
  if (!rows.length) return [];

  const latest = rows[rows.length - 1];
  const first = rows[0];

  const totalActual =
    latest.adsl +
    latest.cablemodem +
    latest.fibra_optica +
    latest.wireless;

  const fibraShare =
    (latest.fibra_optica / totalActual) * 100;

  const insights: Insight[] = [];

  insights.push({
    title: "Predominio de la fibra óptica",
    text: `La fibra óptica representa ${fibraShare.toFixed(
      1
    )}% de los accesos actuales.`,
  });

  if (
    latest.fibra_optica >
    latest.cablemodem
  ) {
    insights.push({
      title: "Tecnología dominante",
      text: "La fibra óptica superó al cablemódem y es actualmente la principal tecnología de acceso a Internet.",
    });
  }

  const adslDrop =
    ((first.adsl - latest.adsl) /
      first.adsl) *
    100;

  if (adslDrop > 50) {
    insights.push({
      title: "Retroceso del ADSL",
      text: `Los accesos ADSL disminuyeron ${adslDrop.toFixed(
        1
      )}% respecto del inicio de la serie.`,
    });
  }

  return insights;
}

export function getPenetracionInsights(
  rows: InternetPenetracionRow[]
): Insight[] {
  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  const gap =
    latest.accesos_cada_100_hogares -
    latest.accesos_cada_100_habitantes;

  const peakHogares = Math.max(
    ...rows.map((r) => r.accesos_cada_100_hogares)
  );

  const insights: Insight[] = [];

  insights.push({
    title: "Penetración actual",
    text: `La penetración alcanzó ${latest.accesos_cada_100_hogares.toFixed(
      2
    )} accesos cada 100 hogares.`,
  });

  insights.push({
    title: "Brecha hogares vs habitantes",
    text: `La diferencia actual es de ${gap.toFixed(
      2
    )} puntos entre ambos indicadores.`,
  });

  if (
    latest.accesos_cada_100_hogares ===
    peakHogares
  ) {
    insights.push({
      title: "Máximo histórico",
      text: "El último período registra la mayor penetración sobre hogares de toda la serie.",
    });
  }

  return insights;
}

export function getIngresosInsights(
  rows: InternetIngresosRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const growth =
    ((latest.ingresos - first.ingresos) /
      first.ingresos) *
    100;

  const peak = Math.max(
    ...rows.map((r) => r.ingresos)
  );

  const insights: Insight[] = [];

  insights.push({
    title: "Variación del período",
    text: `Los ingresos variaron ${growth.toFixed(
      1
    )}% durante el período seleccionado.`,
  });

  if (latest.ingresos === peak) {
    insights.push({
      title: "Máximo histórico",
      text: "El último período registra el mayor nivel de ingresos de toda la serie analizada.",
    });
  }

  return insights;
}