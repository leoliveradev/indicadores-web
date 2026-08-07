"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type DataPoint = {
  label: string;
  accesos: number;
};

export function PenetracionLineChart({
  data,
}: {
  data: DataPoint[];
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="label"
          minTickGap={50}
        />

        <YAxis />

        <Tooltip />

        <Line
          dataKey="accesos"
          stroke="#2563eb"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}