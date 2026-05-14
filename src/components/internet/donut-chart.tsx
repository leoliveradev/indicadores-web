import { useMemo } from "react";
import { TECH_CONFIG } from "@/lib/constant";

// // ── Data fetching ─────────────────────────────────────────────────────
type Row = Record<string, number>;

export function DonutChart({ cur }: { cur: Row | null }) {
  const data = useMemo(() => {
    if (!cur) return [];
    return TECH_CONFIG.map((t) => ({
      name: t.label,
      value: cur[t.key as string] ?? 0,
      color: t.color,
      pct: cur.total > 0 ? ((cur[t.key as string] ?? 0) / cur.total * 100) : 0,
    }));
  }, [cur]);

  if (!cur) return (
    <div style={{ width: "100%", height: 190, background: "rgba(11,23,66,0.05)", borderRadius: 8, animation: "pulse 1.4s infinite" }} />
  );
}