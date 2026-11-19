import { get } from "@/lib/api/client";

import type { ApiResponse } from "@/lib/types";
import type {
  LocalidadGeo,
  PartidoGeo,
  ProvinciaGeo
} from "@/lib/geo";

export function getGeoProvincias() {
  return get<ApiResponse<ProvinciaGeo>>(
    "/api/v1/geo/provincias"
  );
}

export function getGeoPartidos() {
  return get<ApiResponse<PartidoGeo>>(
    "/api/v1/geo/partidos"
  );
}

export function getGeoLocalidades() {
  return get<ApiResponse<LocalidadGeo>>(
    "/api/v1/geo/localidades"
  );
}