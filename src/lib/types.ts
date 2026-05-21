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

export type InternetAccesosTecnologia = {
  anio: number;
  trimestre: number;
  total: number;
  fibra_optica: number;
  cablemodem: number;
  adsl: number;
  wireless: number;
  otros: number;
};

export type InternetTecnologiaRow = {
  periodo: string;
  fibra_optica: number;
  cablemodem: number;
  adsl: number;
  wireless: number;
  otros: number;
  total: number;
};

export type InternetVelocidadMediaRow = {
  anio: number;
  trimestre: number;
  Mbps: number;
};

export type InternetPenetracionRow = {
  anio: number;
  trimestre: number;
  accesos_cada_100_hogares: number;
  accesos_cada_100_habitantes: number;
};