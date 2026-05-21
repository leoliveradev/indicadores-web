import { TrendBadge } from "@/components/internet/trend-badge";

export function KPICard({
  label, value, trend,
}: {
  label: string; value: string | null; trend: number | null;
}) {
  return (
    <div style={{ background: "#BCE4F4", borderRadius: 8, padding: "14px 18px" }}>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0074A6", marginBottom: 6 }}>
        {label}
      </div>
      {value === null ? (
        <div style={{ width: 120, height: 26, background: "rgba(11,23,66,0.1)", borderRadius: 4, margin: "4px 0 8px", animation: "pulse 1.4s infinite" }} />
      ) : (
        <div style={{ fontSize: 22, fontWeight: 600, color: "#0B1742", letterSpacing: "-0.02em", fontFamily: "'Consolas', monospace" }}>
          {value}
        </div>
      )}
      <TrendBadge pct={trend} />
    </div>
  );
}

