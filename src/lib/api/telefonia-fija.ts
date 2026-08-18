import { get } from "@/lib/api/client";
import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaAccesosRow,
  TelefoniaFijaAccesosProvinciaRow,
  TelefoniaFijaPenetracionRow,
  TelefoniaFijaPenetracionProvinciaRow,
  TelefoniaFijaIngresosRow,
} from "@/lib/telefonia-fija";

export async function getTelefoniaFijaAccesos() {
  return get<ApiResponse<TelefoniaFijaAccesosRow>>(
    "/api/v1/telefonia-fija/accesos"
  );
}

export async function getTelefoniaFijaAccesosProvinciasLatest() {
  return get<ApiResponse<TelefoniaFijaAccesosProvinciaRow>>(
    "/api/v1/telefonia-fija/accesos/provincias/latest"
  );
}

export async function getTelefoniaFijaPenetracion() {
  return get<ApiResponse<TelefoniaFijaPenetracionRow>>(
    "/api/v1/telefonia-fija/penetracion"
  );
}

export async function getTelefoniaFijaPenetracionProvinciasLatest() {
  return get<ApiResponse<TelefoniaFijaPenetracionProvinciaRow>>(
    "/api/v1/telefonia-fija/penetracion/provincias/latest"
  );
}

export async function getTelefoniaFijaIngresos() {
  return get<ApiResponse<TelefoniaFijaIngresosRow>>(
    "/api/v1/telefonia-fija/ingresos"
  );
}