import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import type {
  InternetPenetracionEvolutionItem,
} from "@/lib/internet/types";

export function PenetracionLineChart({
  data,
  mode,
}: {
  data: InternetPenetracionEvolutionItem[];
  mode: "hogares" | "habitantes" | "ambos";
}) {
  const series = [];

  if (
    mode === "hogares" ||
    mode === "ambos"
  ) {
    series.push({
      key: "hogares",
      label: "Hogares",
      color: "var(--blue-300)",
    });
  }

  if (
    mode === "habitantes" ||
    mode === "ambos"
  ) {
    series.push({
      key: "habitantes",
      label: "Habitantes",
      color: "var(--accent-green)",
    });
  }

  return (
    <LineChartBase
      data={data}
      height={320}
      xDataKey="period"
      series={series}
    />
  );
}