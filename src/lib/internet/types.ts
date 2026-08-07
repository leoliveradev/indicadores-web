
export type InternetTecnologiaRow = {
  anio: number;
  trimestre: number;
  fibra_optica: number;
  cablemodem: number;
  adsl: number;
  wireless: number;
  otros: number;
  total: number;
};

export type InternetTecnologiaProvinciaRow = InternetTecnologiaRow & {
  provincia: string;
};

export type InternetVelocidadRangosRow = {
  anio: number;
  trimestre: number;
  hasta_512_kbps: number;
  entre_512_1Mbps: number;
  entre_1Mbps_6Mbps: number;
  entre_6Mbps_10Mbps: number;
  entre_10Mbps_20Mbps: number;
  entre_20Mbps_30Mbps: number;
  mayor_30Mbps: number;
  otros: number;
  total: number;
};

export type InternetVelocidadRangosProvinciasRow = InternetVelocidadRangosRow & {
  provincia: string;
};

export type InternetPenetracionRow = {
  anio: number;
  trimestre: number;
  accesos_cada_100_hogares: number;
  accesos_cada_100_habitantes: number;
};

export type InternetPenetracionProvinciaRow = InternetPenetracionRow & {
  provincia: string;
};

export type InternetPenetracionEvolutionItem = {
  period: string;
  hogares: number;
  habitantes: number;
};

export interface InternetVelocidadMediaRow {
  anio: number;
  trimestre: number;
  Mbps: number;
}

export interface InternetVelocidadMediaProvinciasRow {
  id: number;
  created_at: string;
  anio: number;
  trimestre: number;
  provincia: string;
  mbps: number;
}

export interface InternetIngresosRow {
  anio: number;
  trimestre: number;
  ingresos: number;
}
