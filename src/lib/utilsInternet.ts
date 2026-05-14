
export const trendPct = (cur: number, prev: number): number | null => 
  !prev ? null : ((cur - prev) / Math.abs(prev)) * 100;

export const firstNumKey = (obj: Record<string, any>): string | null => 
  Object.keys(obj).find(k => !["anio", "trimestre", "mes"].includes(k) && typeof obj[k] === "number") ?? null;
