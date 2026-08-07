import { get } from "@/lib/api/client";

import type { ApiResponse } from "@/lib/types";
import type {
  ComunicacionesMovilesAccesosRow,
  ComunicacionesMovilesIngresosRow,
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesPenetracionRow,
  ComunicacionesMovilesSmsRow,
} from "@/lib/comunicaciones-moviles/types";

export async function getMovilesAccesos() {
  return get<ApiResponse<ComunicacionesMovilesAccesosRow>>(
    "/api/v1/comunicaciones-moviles/accesos"
  );
}

export async function getMovilesIngresos() {
  return get<ApiResponse<ComunicacionesMovilesIngresosRow>>(
    "/api/v1/comunicaciones-moviles/ingresos"
  );
}

export async function getMovilesLlamadas() {
  return get<ApiResponse<ComunicacionesMovilesLlamadasRow>>(
    "/api/v1/comunicaciones-moviles/llamadas"
  );
}

export async function getMovilesMinutos() {
  return get<ApiResponse<ComunicacionesMovilesMinutosRow>>(
    "/api/v1/comunicaciones-moviles/minutos"
  );
}

export async function getMovilesPenetracion() {
  return get<ApiResponse<ComunicacionesMovilesPenetracionRow>>(
    "/api/v1/comunicaciones-moviles/penetracion"
  );
}

export async function getMovilesSms() {
  return get<ApiResponse<ComunicacionesMovilesSmsRow>>(
    "/api/v1/comunicaciones-moviles/sms"
  );
}