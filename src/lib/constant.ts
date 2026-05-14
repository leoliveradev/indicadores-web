export interface AccesoTecnologia {
  anio: number;
  trimestre: number;
  adsl: number;
  cablemodem: number;
  fibraOptica: number;
  wireless: number;
  otros: number;
  total: number;
}

export interface TechConfig {
  key: keyof Omit<AccesoTecnologia, 'anio' | 'trimestre' | 'total'>;
  label: string;
  color: string;  
}

export const TECH_CONFIG: TechConfig[] = [
  { key: "adsl",         label: "ADSL",        color: "#378ADD" },
  { key: "cablemodem",   label: "Cablemodem",  color: "#1D9E75" },
  { key: "fibraOptica",  label: "Fibra óptica",color: "#185FA5" },
  { key: "wireless",     label: "Wireless",    color: "#BA7517" },
  { key: "otros",        label: "Otros",       color: "#993C1D" },
];
