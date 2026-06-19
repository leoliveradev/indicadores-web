"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Item = {
  provincia: string;
  hogares: number;
  habitantes: number;
};

function formatNumber(n: number) {
  return n.toLocaleString("es-AR");
}

export function PenetracionProvinciasRanking({
  data,
}: {
  data: Item[];
}) {
  const height = data.length * 30 + 40;

console.log(data[0]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 16, right: 16, left: 16, bottom: 16 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.08)"
        />

        <XAxis
          type="number"
          tickFormatter={formatNumber}
        />

        <YAxis
          type="category"
          dataKey="provincia"
          width={120}
          tick={{ fontSize: 11 }}
        />

        <Tooltip
          formatter={(value) =>
            typeof value === "number"
              ? `${formatNumber(value)} accesos`
              : value
          }
        />

        {/* Habitantes atrás */}
        <Bar
          dataKey="habitantes"
          fill="var(--accent-green)"
          radius={[0, 4, 4, 0]}
        />

        {/* Hogares arriba */}
        <Bar
          dataKey="hogares"
          fill="var(--blue-200)"
          radius={[0, 4, 4, 0]}
        />

      </BarChart>
    </ResponsiveContainer>
  );
}