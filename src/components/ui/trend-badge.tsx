import { dispValue } from "@/lib/format";

export function TrendBadge({ pct }: { pct: number | null }) {
  if (pct === null || pct === 0) return null;
  const isPositive = pct > 0;
  
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "11px",
      fontWeight: 600,
      color: isPositive ? "var(--positive)" : "var(--negative)",
      padding: "2px 8px",
      borderRadius: "12px",
      background: isPositive ? "var(--positive-bg)" : "var(--negative-bg)"
    }}>
      <span>{isPositive ? "↑" : "↓"}</span>
      <span>{isPositive ? "+" : ""}{dispValue(pct, { decimals: 2 })}%</span>
    </div>
  );
}