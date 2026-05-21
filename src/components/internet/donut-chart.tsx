"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

type DonutItem = {
  name: string;
  value: number;
  color: string;
};

export function DonutChart({ data }: { data: DonutItem[] }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        width: "100%",
        height: 200,
        background: "rgba(11,23,66,0.05)",
        borderRadius: 8
      }} />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={90}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value, name, props) => {
            const v = Array.isArray(value)
              ? value.join(", ")
              : typeof value === "number"
                ? value.toLocaleString("es-AR")
                : value ?? "";

            const pct = props?.payload?.pct;

            if (pct !== undefined) {
              return [`${v} (${pct.toFixed(1)}%)`, name];
            }

            return v;
          }}
        />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
