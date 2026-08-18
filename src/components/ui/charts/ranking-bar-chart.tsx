"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type RankingItem = {
  label: string;
  value: number;
};

type Props = {
  data: RankingItem[];
  color?: string;
  formatter?: (value: number) => string;
};

export function RankingBarChart({
  data,
  color = "#005297",
  formatter = (v) => v.toLocaleString("es-AR"),
}: Props) {
  const height = data.length * 38 + 40;

  return (
    <ResponsiveContainer
      width="100%"
      height={height}
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 10,
        }}
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
          dataKey="value"
          fill={color}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}