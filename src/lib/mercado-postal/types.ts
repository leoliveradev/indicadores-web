export interface MercadoPostalFacturacionRow {
  anio: number;
  mes: number;

  postales: number;
  telegraficas: number;
  monetarios: number;
}

export interface MercadoPostalProduccionRow {
  anio: number;
  mes: number;

  postales: number;
  telegraficas: number;
  monetarios: number;
}

export interface MercadoPostalPersonalRow {
  anio: number;
  trimestre: number;

  personal_ocupado: number;
}

export interface MercadoPostalProvinciaRow {
  id: number;
  created_at: string;

  anio: number;
  trimestre: number;

  provincia: string;

  pesos: number;
  unidades: number;
}