import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

import type { InternetPenetracionEvolutionItem } from "@/lib/types"

export function PenetracionLineChart({
  data,
  mode,
}: {
  data: InternetPenetracionEvolutionItem[];
  mode: "hogares" | "habitantes" | "ambos";
}) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="period" />
        <YAxis domain={["auto", "auto"]} />

        <Tooltip
          itemSorter={(item) => -item}
          labelFormatter={(label) => `Período: ${label}`}
        />
        <Legend />

        {(mode === "hogares" || mode === "ambos") && (
          <Line
            type="monotone"
            dataKey="hogares"
            name="Hogares"
            stroke="var(--blue-300)"
            strokeWidth={2}
            dot={false}
          />
        )}

        {(mode === "habitantes" || mode === "ambos") && (
          <Line
            type="monotone"
            dataKey="habitantes"
            name="Habitantes"
            stroke="var(--accent-green)"
            strokeWidth={2}
            dot={false}
          />

        )}
      </LineChart>
    </ResponsiveContainer>
  );
}