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

import { dispValue } from "@/lib/format";

export function SmsLineChart({
  data,
}: {
  data: {
    label: string;
    sms: number;
  }[];
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="label"
          minTickGap={50}
        />

        <YAxis
          tickFormatter={(v) =>
            dispValue(Number(v), {
              format: "compact",
            })
          }
        />

        <Tooltip />

        <Line
          dataKey="sms"
          stroke="#dc2626"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}