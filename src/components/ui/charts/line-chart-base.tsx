"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type Series = {
  key: string;
  label: string;
  color: string;
  strokeWidth?: number;
  strokeDasharray?: string;
};

type Props = {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  yFormatter?: (value: number) => string;
  xDataKey?: string;
};

export function LineChartBase({
  data,
  series,
  height = 400,
  yFormatter,
  xDataKey
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={height}
    >
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,.08)"
        />

        <XAxis
          dataKey={xDataKey ?? "label"}
          minTickGap={50}
        />

        <YAxis
          tickFormatter={(value) =>
            yFormatter
              ? yFormatter(Number(value))
              : Number(value).toLocaleString("es-AR")
          }
        />

        <Tooltip />

        <Legend />

        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={s.strokeWidth ?? 2}
            strokeDasharray={s.strokeDasharray}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}