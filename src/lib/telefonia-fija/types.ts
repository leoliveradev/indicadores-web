export type TelefoniaFijaAccesosRow = {
  anio: number;
  trimestre: number;

  hogares: number;
  comercial: number;
  gobierno: number;
  otros: number;
  total: number;
};

export type TelefoniaFijaAccesosProvinciaRow =
  TelefoniaFijaAccesosRow & {
    id: number;
    created_at: string;

    provincia: string;
  };


export type TelefoniaFijaPenetracionRow = {
  anio: number;
  trimestre: number;

  accesos_100_hab: number;
  accesos_100_hog: number;
}

export type TelefoniaFijaPenetracionProvinciaRow = 
  TelefoniaFijaPenetracionRow & {
  id: number;
  created_at: string;

  provincia: string;
}

export type TelefoniaFijaIngresosRow = {
  anio: number;
  trimestre: number;

  ingresos: number;
}