import { get } from "@/lib/api/client";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionAccesosRow,
  TelevisionAccesosProvinciaRow,
  TelevisionIngresosRow,
  TelevisionPenetracionRow,
  TelevisionPenetracionProvinciaRow,
} from "@/lib/television";

export async function getTelevisionAccesos() {
  return get<ApiResponse<TelevisionAccesosRow>>(
    "/api/v1/television/accesos"
  );
}

export async function getTelevisionAccesosProvinciasLatest() {
  return get<ApiResponse<TelevisionAccesosProvinciaRow>>(
    "/api/v1/television/accesos/provincias/latest"
  );
}

export async function getTelevisionPenetracion() {
  return get<ApiResponse<TelevisionPenetracionRow>>(
    "/api/v1/television/penetracion"
  );
}

export async function getTelevisionPenetracionProvinciasLatest() {
  return get<ApiResponse<TelevisionPenetracionProvinciaRow>>(
    "/api/v1/television/penetracion/provincias/latest"
  );
}

export async function getTelevisionIngresos() {
  return get<ApiResponse<TelevisionIngresosRow>>(
    "/api/v1/television/ingresos"
  );
}