"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { dispValue } from "@/lib/format";
import { TrendBadge } from "@/components/ui/trend-badge";

type GaugeData = {
  value: number;
  trend?: number | null;
};

export function VelocidadGauge({ data }: { data: GaugeData }) {
  if (!data) {
    return <div className="skeleton" style={{ height: 200 }} />;
  }

  const chartData = [
    { name: "Mbps", value: data.value, fill: "var(--blue-200)" }
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      
      <div style={{ width: "100%", height: 180 }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="80%"
            outerRadius="120%"
            startAngle={180}
            endAngle={0}
            data={chartData}
          >
            <RadialBar
              background={{ fill: "var(--blue-100)" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-[-30px]">
        <div style={{
          fontSize: "28px",
          fontWeight: 600,
          color: "var(--enacom-navy)"
        }}>
          {dispValue(data.value, { decimals: 1 })}
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          Mbps de descarga
        </div>

        {data.trend != null && (
          <div className="mt-2">
            <TrendBadge pct={data.trend} />
          </div>
        )}
      </div>
    </div>
  );
}
