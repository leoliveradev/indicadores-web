export interface ApiResponse<T> {
  data: T[];
}

export interface BaseResponseAPI {
  anio: number;
  trimestre: number;
  mes: number;
  [key: string]: number ;
}

export type AsyncState<T> = 
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

export const TRIMESTRES_LABELS: Record<number, string> = {
  1: 'T1 - Ene-Mar',
  2: 'T2 - Abr-Jun',
  3: 'T3 - Jul-Sep',
  4: 'T4 - Oct-Dic',
};

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


export type AccesoTecnologia = {
  anio: number;
  trimestre: number;
  total: number;
  fibra_optica: number;
  cablemodem: number;
  adsl: number;
  wireless: number;
  otros: number;
};
