import { get } from "@/lib/api/client";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

export async function getPortabilidadMovil() {
  return get<ApiResponse<PortabilidadMovilRow>>(
    "/api/v1/portabilidad/moviles"
  );
}