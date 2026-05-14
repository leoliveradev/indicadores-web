import { dispValue } from "@/lib/format";

  export const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { pct: number } }[] }) => {
    if (!active || !payload?.length) return null;
    const p = payload[0];
    return (
      <div style={{ background: "#fff", border: "0.5px solid rgba(11,23,66,0.15)", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
        <div style={{ fontWeight: 600, color: "#0B1742" }}>{p.name}</div>
        <div style={{ color: "#555" }}>{dispValue(p.value, { decimals: 0 })} accesos</div>
        <div style={{ color: "#0074A6", fontWeight: 600 }}>{dispValue(p.payload.pct, { decimals: 2 })}%</div>
      </div>
    );
  };