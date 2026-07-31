"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type DataPoint = {
  label: string;
  mbps: number;
};

export function VelocidadLineChart({
  data,
}: {
  data: DataPoint[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,.08)"
        />

        <XAxis dataKey="label" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="mbps"
          stroke="var(--blue-200)"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}