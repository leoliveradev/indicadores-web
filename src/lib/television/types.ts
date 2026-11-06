export type TelevisionAccesosRow = {
  anio: number;
  trimestre: number;

  tv_suscripcion: number;
  tv_satelital: number;
};

export type TelevisionAccesosProvinciaRow =
  TelevisionAccesosRow & {

    id: number;
    created_at: string;

    provincia: string;
  };

export type TelevisionPenetracionRow = {
  anio: number;
  trimestre: number;

  tv_suscripcion_100_habitantes: number;
  tv_satelital_100_habitantes: number;

  tv_suscripcion_100_hogares: number;
  tv_satelital_100_hogares: number;
}

export type TelevisionPenetracionProvinciaRow = TelevisionPenetracionRow & {
  id: number;
  created_at: string;
  provincia: string;
}

export type TelevisionIngresosRow = {
  anio: number;
  trimestre: number;

  tv_suscripcion: number;
  tv_satelital: number;
}