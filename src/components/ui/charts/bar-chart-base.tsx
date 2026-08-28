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
  data: Record<string, unknown>[];

  dataKey: string;

  label: string;

  color: string;

  height?: number;

  xDataKey?: string;

  yFormatter?: (
    value: number
  ) => string;

  tooltipFormatter?: (
    value: number
  ) => string;

  showLegend?: boolean;
};

export function BarChartBase({
  data,
  dataKey,
  label,
  color,
  height = 400,
  xDataKey = "label",
  yFormatter,
  tooltipFormatter,
  showLegend = false,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={height}
    >
      <BarChart
        data={data}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,.08)"
        />

        <XAxis
          dataKey={xDataKey}
        />

        <YAxis
          domain={[0, "auto"]}
          tickFormatter={(value) =>
            yFormatter
              ? yFormatter(
                  Number(value)
                )
              : Number(
                  value
                ).toLocaleString(
                  "es-AR"
                )
          }
        />

        <Tooltip
          formatter={(
            value
          ) =>
            tooltipFormatter
              ? [
                  tooltipFormatter(
                    Number(value)
                  ),
                  label,
                ]
              : [
                  Number(
                    value
                  ).toLocaleString(
                    "es-AR"
                  ),
                  label,
                ]
          }
        />

        {showLegend && (
          <Legend />
        )}

        <Bar
          dataKey={dataKey}
          name={label}
          fill={color}
          radius={[
            4,
            4,
            0,
            0,
          ]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}