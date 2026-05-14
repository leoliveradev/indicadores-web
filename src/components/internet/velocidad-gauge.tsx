"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { firstNumKey, trendPct } from "@/lib/utilsInternet";
import { dispValue } from "@/lib/format";
import { TrendBadge } from "@/components/ui/trend-badge"; // Asegúrate de moverlo a UI

type Row = Record<string, any>;

interface VelocidadGaugeProps {
  cur: Row | null;
  prev: Row | null;
}

export function VelocidadGauge({ cur, prev }: VelocidadGaugeProps) {
  if (!cur) {
    return <div className="skeleton" style={{ width: "100%", height: 220 }} />;
  }

  const key = firstNumKey(cur);
  if (!key) return <div className="error-box">Sin datos de velocidad</div>;
  
  const value = Number(cur[key]);
  const prevValue = prev ? Number(prev[key]) : null;
  const trend = prevValue ? trendPct(value, prevValue) : null;

  // Definimos un máximo dinámico para que la aguja se mueva proporcionalmente
  const MAX_SPEED = 300; 
  const chartData = [{ name: "Mbps", value: value, fill: "var(--blue-200)" }];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Contenedor con altura para Recharts */}
      <div style={{ width: "100%", height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="100%" 
            innerRadius="80%"
            outerRadius="120%"
            startAngle={180}
            endAngle={0}
            data={chartData}
            barSize={20}
          >
            {/* Fondo del Gauge */}
            <RadialBar
              background={{ fill: "var(--blue-100)" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Etiquetas de datos */}
      <div className="text-center mt-[-30px] z-10">
        <div style={{ 
          fontSize: "32px", 
          fontWeight: 600, 
          color: "var(--enacom-navy)",
          fontFamily: "var(--font-mono)" 
        }}>
          {dispValue(value, { decimals: 2 })}
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "-4px" }}>
          Mbps de descarga
        </div>
        {trend !== null && (
          <div className="mt-2 flex justify-center">
            <TrendBadge pct={trend} />
          </div>
        )}
      </div>
    </div>
  );
}