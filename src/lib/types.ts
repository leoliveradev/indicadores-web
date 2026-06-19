export interface ApiResponse<T> {
  data: T[];
}

export interface BaseResponseAPI {
  anio: number;
  trimestre: number;
  mes: number;
}

export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

export interface Overview {
  periodo: string;

  accesos: {
    fija: number;
    internet: number;
    tv: number;
    moviles: number;
  };

  penetracion: {
    fija: number;
    internet: number;
    tv: number;
    moviles: number;
  };

  portabilidad: {
    moviles: {
      acumuladas: number;
      mes: number;
    };
    fija: {
      acumuladas: number;
      mes: number;
    };
  };

  miscelaneas: {
    velocidad_mbps: number;
    radiobases_4g: number;
    fibra_pct: number;
    satelital_pct: number;
  };

  ingresos: {
    fija: number;
    internet: number;
    tv: number;
    moviles: number;
  };

  postal: {
    facturacion: number;
    produccion: number;
  };
}

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

export type InternetVelocidadMediaRow = {
  anio: number;
  trimestre: number;
  Mbps: number;
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