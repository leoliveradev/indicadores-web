export interface TelevisionAccesosRow {
  anio: number;
  trimestre: number;

  tv_suscripcion: number;
  tv_satelital: number;
}

export interface TelevisionAccesosProvinciaRow {
  id: number;
  created_at: string;

  anio: number;
  trimestre: number;

  provincia: string;

  tv_suscripcion: number;
}

export interface TelevisionIngresosRow {
  anio: number;
  trimestre: number;

  tv_suscripcion: number;
  tv_satelital: number;
}

export interface TelevisionPenetracionRow {
  anio: number;
  trimestre: number;

  tv_suscripcion_100_habitantes: number;
  tv_satelital_100_habitantes: number;

  tv_suscripcion_100_hogares: number;
  tv_satelital_100_hogares: number;
}

export interface TelevisionPenetracionProvinciaRow {
  id: number;
  created_at: string;

  anio: number;
  trimestre: number;

  provincia: string;

  tv_suscripcion_100habitantes: number;
  tv_suscripcion_100hogares: number;
}