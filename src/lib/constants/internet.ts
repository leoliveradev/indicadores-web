import type { InternetAccesosTecnologia } from "@/lib/types";

export type TechKey = keyof Omit<
  InternetAccesosTecnologia,
  "anio" | "trimestre" | "total"
>;

export type TechConfig = {
  key: TechKey;
  label: string;
  color: string;
};

export const TECH_CONFIG: TechConfig[] = [
  { key: "adsl",         label: "ADSL",         color: "#378ADD" },
  { key: "cablemodem",   label: "Cablemodem",   color: "#1D9E75" },
  { key: "fibra_optica", label: "Fibra óptica", color: "#185FA5" },
  { key: "wireless",     label: "Wireless",     color: "#BA7517" },
  { key: "otros",        label: "Otros",        color: "#993C1D" },
];