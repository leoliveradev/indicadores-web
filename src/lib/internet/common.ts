import type { ChartConfig } from "@/lib/constants/internet";

export type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number | null | undefined
    ? K
    : never;
}[keyof T] & string;

export function buildDonutData<
  T,
  K extends NumericKeys<T>
>(
  row: T,
  config: ChartConfig<K>[]
) {
  return config.map((c) => ({
    name: c.label,
    value: row[c.key] ?? 0,
    color: c.color,
  }));
}

export function getTopN<T>(
  rows: T[],
  selector: (row: T) => number,
  top = 10
) {
  return [...rows]
    .sort((a, b) => selector(b) - selector(a))
    .slice(0, top);
}