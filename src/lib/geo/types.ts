export interface ProvinciaGeo {
  id: number;
  provincia: string;
}

export interface PartidoGeo {
  id: number;
  partido: string;
  provincia_id: number;
}

export interface LocalidadGeo {
  id: number;
  localidad: string;
  partido_id: number;
}