import type { InternetTecnologiaRow, InternetVelocidadRangosRow } from "@/lib/types";

export type TechKey = Extract<
  keyof Omit<InternetTecnologiaRow, "anio" | "trimestre" | "total">,
  string
>;

export type VelocityKey = Extract<
  keyof Omit<InternetVelocidadRangosRow, "anio" | "trimestre">,
  string
>;

export type ChartConfig<K extends string> = {
  key: K;
  label: string;
  color: string;
};

export const TECH_CONFIG = [
  { key: "adsl",         label: "ADSL",         color: "var(--blue-300)" },
  { key: "cablemodem",   label: "Cablemodem",   color: "var(--accent-green)" },
  { key: "fibra_optica", label: "Fibra óptica", color: "var(--blue-500)" },
  { key: "wireless",     label: "Wireless",     color: "var(--accent-amber)" },
  { key: "otros",        label: "Otros",        color: "var(--accent-red)" },
] satisfies ChartConfig<TechKey>[];

export const TECH_CONFIG_KPI = TECH_CONFIG.filter(
  (t) => t.key !== "otros"
);

export const VELOCITY_CONFIG = [
  { key: "hasta_512_kbps",      label: "< 512 Kbps",        color: "var(--accent-green)" },
  { key: "entre_512_1Mbps",     label: "512K - 1 Mbps",     color: "var(--accent-amber)" },
  { key: "entre_1Mbps_6Mbps",   label: "1 - 6 Mbps",        color: "var(--blue-200)" },
  { key: "entre_6Mbps_10Mbps",  label: "6 - 10 Mbps",       color: "var(--blue-300)" },
  { key: "entre_10Mbps_20Mbps", label: "10 - 20 Mbps",      color: "var(--blue-400)" },
  { key: "entre_20Mbps_30Mbps", label: "20 - 30 Mbps",      color: "var(--blue-500)" },
  { key: "mayor_30Mbps",        label: "> 30 Mbps",         color: "var(--accent-red)" },
] satisfies ChartConfig<VelocityKey>[];