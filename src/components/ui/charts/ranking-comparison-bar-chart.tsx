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
  label: string;
  primary: number;
  secondary: number;
};

type Props = {
  data: Item[];
  primaryLabel: string;
  secondaryLabel: string;
  primaryColor?: string;
  secondaryColor?: string;
  formatter?: (value: number) => string;
};

export function RankingComparisonBarChart({
  data,
  primaryLabel,
  secondaryLabel,
  primaryColor = "#005297",
  secondaryColor = "#22c55e",
  formatter = (v) => v.toLocaleString("es-AR"),
}: Props) {
  const height = data.length * 30 + 40;

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
          tickFormatter={formatter}
        />

        <YAxis
          type="category"
          dataKey="label"
          width={120}
        />

        <Tooltip
          formatter={(value) =>
            formatter(Number(value))
          }
        />

        <Bar
          dataKey="secondary"
          fill={secondaryColor}
          name={secondaryLabel}
        />

        <Bar
          dataKey="primary"
          fill={primaryColor}
          name={primaryLabel}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}