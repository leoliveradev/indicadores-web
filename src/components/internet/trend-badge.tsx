import { dispValue } from "@/lib/format";
// ── Trend indicator ───────────────────────────────────────────────────
export function TrendBadge({ pct }: { pct: number | null }) {
  if (pct === null) return null;
  const up = pct > 0;
  const style: React.CSSProperties = {
    fontSize: 10, fontWeight: 600,
    color: up ? "#0F6E56" : pct < 0 ? "#A32D2D" : "#666",
    display: "flex", alignItems: "center", gap: 3, marginTop: 6,
  };
  return (
    <div style={style}>
      {up ? "↑" : pct < 0 ? "↓" : "→"}
      {" "}{up ? "+" : ""}{dispValue(pct, { decimals: 2 })}% vs trim. anterior
    </div>
  );
}
