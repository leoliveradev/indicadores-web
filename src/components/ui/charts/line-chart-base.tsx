"use client";
import { useState } from "react";

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
  activeDot?: boolean;
  hidden?: boolean;
};

type Props = {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  yDomain?: [number | string, number | string];
  yAxisWidth?: number;
  yFormatter?: (value: number) => string;
  tooltipFormatter?: (
    value: number,
    name: string
  ) => string;
  xDataKey?: string;
};

export function LineChartBase({
  data,
  series,
  height = 400,
  yDomain,
  yAxisWidth = 70,
  yFormatter,
  tooltipFormatter,
  xDataKey,
}: Props) {
  const [hiddenSeries, setHiddenSeries] =
    useState<string[]>([]);

  const toggleSeries = (
    key: string
  ) => {
    setHiddenSeries((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={height}
    >
      <LineChart
        key={data.length}
        data={data}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,.08)"
        />

        <XAxis
          dataKey={xDataKey ?? "label"}
          minTickGap={50}
          padding={{
            left: 0,
            right: 20,
          }}
        />

        <YAxis
          domain={yDomain ?? [0, "auto"]}
          // tickCount={5}
          width={yAxisWidth}
          tickFormatter={(value) =>
            yFormatter
              ? yFormatter(Number(value))
              : Number(value).toLocaleString("es-AR")
          }
        />

        <Tooltip
          formatter={(value, name) =>
            tooltipFormatter
              ? tooltipFormatter(
                Number(value),
                String(name)
              )
              : Number(value).toLocaleString(
                "es-AR"
              )
          }
        />

        <Legend
          onClick={(payload) => {
            if (
              payload &&
              "dataKey" in payload
            ) {
              toggleSeries(
                String(payload.dataKey)
              );
            }
          }}
        />

        {series.map((s) => (
          <Line
            key={s.key}
            type="linear"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={s.strokeWidth ?? 2}
            strokeDasharray={s.strokeDasharray}
            dot={false}
            activeDot={
              s.activeDot
                ? { r: 5 }
                : false
            }
            hide={hiddenSeries.includes(s.key)}
          />
        ))}

      </LineChart>

    </ResponsiveContainer>
  );
}