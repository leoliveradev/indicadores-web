import type { Overview } from "@/lib/types";
import { get } from "./client";

export function getOverview() {
  return get<Overview>("/api/v1/overview/latest", 3600);
}