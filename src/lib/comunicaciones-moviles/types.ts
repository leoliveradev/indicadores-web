export interface ComunicacionesMovilesAccesosRow {
  anio: number;
  trimestre: number;

  pospago: number;
  prepago: number;
  operativos: number;

  created_at: string;
}

export type ComunicacionesMovilesPenetracionRow = {
  anio: number;
  trimestre: number;

  accesos_100_hab: number;

  created_at: string;
}

export interface ComunicacionesMovilesIngresosRow {
  anio: number;
  trimestre: number;

  ingresos: number;

  created_at: string;
}

export interface ComunicacionesMovilesLlamadasRow {
  anio: number;
  trimestre: number;

  pospago: number;
  prepago: number;
  total: number;

  created_at: string;
}

export interface ComunicacionesMovilesMinutosRow {
  anio: number;
  trimestre: number;

  pospago: number;
  prepago: number;
  total: number;

  created_at: string;
}

export interface ComunicacionesMovilesSmsRow {
  anio: number;
  trimestre: number;

  sms: number;

  created_at: string;
}