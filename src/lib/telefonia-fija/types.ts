export interface TelefoniaFijaAccesosRow {
  anio: number;
  trimestre: number;

  hogares: number;
  comercial: number;
  gobierno: number;
  otros: number;
  total: number;
}

export interface TelefoniaFijaAccesosProvinciaRow {
  id: number;
  created_at: string;

  anio: number;
  trimestre: number;

  provincia: string;

  hogares: number;
  comercial: number;
  gobierno: number;
  otros: number;
  total: number;
}

export interface TelefoniaFijaPenetracionRow {
  anio: number;
  trimestre: number;

  accesos_100_hab: number;
  accesos_100_hog: number;
}

export interface TelefoniaFijaPenetracionProvinciaRow {
  id: number;
  created_at: string;

  anio: number;
  trimestre: number;

  provincia: string;

  accesos_100_hab: number;
  accesos_100_hog: number;
}

export interface TelefoniaFijaIngresosRow {
  anio: number;
  trimestre: number;

  ingresos: number;
}