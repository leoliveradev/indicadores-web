import { scaleQuantize } from "d3-scale";

export function useColorScale(values: number[]) {
  const max = Math.max(...values, 0);

  return scaleQuantize<string>()
    .domain([0, max])
    .range([
      "var(--blue-100)",
      "var(--blue-200)",
      "var(--blue-300)",
      "var(--blue-400)",
      "var(--blue-500)",
    ]);
}