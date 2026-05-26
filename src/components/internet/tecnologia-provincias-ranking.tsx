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
  provincia: string;
  total: number;
};

function formatNumber(n: number) {
  return n.toLocaleString("es-AR");
}

export function TecnologiaProvinciasRanking({
  data,
}: {
  data: Item[];
}) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 16, right: 16, left: 16, bottom: 16 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />

        <XAxis
          type="number"
          tickFormatter={formatNumber}
        />

        <YAxis
          type="category"
          dataKey="provincia"
          width={110}
          tick={{ fontSize: 11 }}
        />

        <Tooltip
          formatter={(value) =>
            typeof value === "number"
              ? formatNumber(value)
              : value
          }
        />

        <Bar
          dataKey="total"
          fill="var(--blue-200)"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
