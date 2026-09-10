"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  data: {
    rango: string;
    provincia: number;
    nacional: number;
  }[];
};

export function ComparisonBarChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,.08)"
        />

        <XAxis dataKey="rango" />

        <YAxis
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />

        <Tooltip
          formatter={(value) => [
            `${value}%`,
            "",
          ]}
        />

        <Legend />

        <Bar
          dataKey="provincia"
          name="Provincia"
          fill="var(--blue-400)"
        />

        <Bar
          dataKey="nacional"
          name="Argentina"
          fill="var(--accent-green)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}