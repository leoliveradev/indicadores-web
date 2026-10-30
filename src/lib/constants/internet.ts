import type { 
  InternetTecnologiaRow
} from "@/lib/internet";

export type TechKey = Extract<
  keyof Omit<InternetTecnologiaRow, "anio" | "trimestre" | "total">,
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
