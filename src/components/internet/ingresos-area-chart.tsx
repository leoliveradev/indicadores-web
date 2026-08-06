"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { dispCurrencyCompact } from "@/lib/format";

type DataPoint = {
  label: string;
  ingresos: number;
};

type Props = {
  data: DataPoint[];
};

export function IngresosAreaChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <AreaChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,.08)"
        />

        <XAxis
          dataKey="label"
          interval="preserveStartEnd"
          minTickGap={40}
        />

        <YAxis
          width={70}
          tickFormatter={(value) =>
            `$${Math.round(Number(value) / 1e6)}M`
          }
        />

        <Tooltip
          formatter={(value) => [
            dispCurrencyCompact(Number(value)),
            "Ingresos",
          ]}
        />

        <Area
          type="monotone"
          dataKey="ingresos"
          stroke="var(--color-money, #16a34a)"
          fill="var(--color-money, #16a34a)"
          fillOpacity={0.25}
          strokeWidth={3}
          activeDot={{
            r: 6,
            strokeWidth: 2,
            stroke: "#fff",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}