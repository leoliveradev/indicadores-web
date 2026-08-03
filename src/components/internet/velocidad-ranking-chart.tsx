"use client";

import { fmtPercent } from "@/lib/format";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Item = {
  provincia: string;
  mbps: number;
};

export function VelocidadRankingChart({
  data,
}: {
  data: Item[];
}) {
  const height = data.length * 32 + 40;

  return (
    <ResponsiveContainer
      width="100%"
      height={height}
    >
      <BarChart
        data={data}
        layout="vertical"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,.08)"
        />

        <XAxis
          type="number"
          tickFormatter={(value) => `${value} Mbps`}
        />

        <YAxis
          type="category"
          dataKey="provincia"
          width={120}
        />

        <Tooltip
          formatter={(value) =>
            `${Number(value).toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} Mbps`
          }
        />

        <Bar
          dataKey="mbps"
          fill="var(--blue-200)"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}