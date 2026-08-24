import type { Insight } from "@/lib/types";

import type {
  InternetVelocidadMediaRow,
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