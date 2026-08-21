import { get } from "@/lib/api/client";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
  MercadoPostalProduccionRow,
  MercadoPostalPersonalRow,
  MercadoPostalProvinciaRow,
} from "@/lib/mercado-postal";

export async function getMercadoPostalFacturacion() {
  return get<ApiResponse<MercadoPostalFacturacionRow>>(
    "/api/v1/mercado-postal/facturacion"
  );
}

export async function getMercadoPostalProduccion() {
  return get<ApiResponse<MercadoPostalProduccionRow>>(
    "/api/v1/mercado-postal/produccion"
  );
}

export async function getMercadoPostalPersonal() {
  return get<ApiResponse<MercadoPostalPersonalRow>>(
    "/api/v1/mercado-postal/personal-ocupado"
  );
}

export async function getMercadoPostalProvinciasLatest() {
  return get<ApiResponse<MercadoPostalProvinciaRow>>(
    "/api/v1/mercado-postal/facturacion-produccion/provincias/latest"
  );
}