export interface PortabilidadMovilRow {
  anio: number;
  mes: number;

  total: number;
}

export type PortabilidadSeasonalityPoint = {
  mes: string;
  mesNumero: number;
  promedio: number;
};