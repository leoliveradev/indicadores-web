"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DataPoint = {
  label: string;
  adsl: number;
  cablemodem: number;
  fibra_optica: number;
  wireless: number;
};

function formatNumber(value: number) {
  return value.toLocaleString("es-AR");
}

export function TecnologiaLineChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
      >
        {/* GRID */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.08)"
        />

        {/* X */}
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11 }}
        />

        {/* Y */}
        <YAxis
          tickFormatter={formatNumber}
          tick={{ fontSize: 11 }}
        />

        {/* TOOLTIP */}
        <Tooltip
          formatter={(value) => {
            if (typeof value === "number") {
              return formatNumber(value);
            }
            return value;
          }}
          labelStyle={{ fontWeight: 600 }}
        />

        {/* LEGEND */}
        <Legend
          wrapperStyle={{ fontSize: "12px" }}
        />

        {/* LÍNEAS */}

        <Line
          type="monotone"
          dataKey="fibra_optica"
          name="Fibra óptica"
          stroke="var(--accent-green)"
          strokeWidth={3}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="cablemodem"
          name="Cablemodem"
          stroke="var(--blue-400)"
          strokeWidth={2}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="adsl"
          name="ADSL"
          stroke="var(--blue-200)"
          strokeWidth={2}
          strokeDasharray="4 2"
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="wireless"
          name="Wireless"
          stroke="var(--accent-amber)"
          strokeWidth={2}
          dot={false}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}