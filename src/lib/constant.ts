export const MONTHS: Record<string, string> = {
  "1": "Enero",
  "2": "Febrero",
  "3": "Marzo",
  "4": "Abril",
  "5": "Mayo",
  "6": "Junio",
  "7": "Julio",
  "8": "Agosto",
  "9": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
};

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
