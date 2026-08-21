import { get } from "@/lib/api/client"; 

import type { ApiResponse } from "@/lib/types";
import type {
  InternetPenetracionProvinciaRow, InternetPenetracionRow, 
  InternetTecnologiaProvinciaRow, InternetTecnologiaRow, 
  InternetVelocidadMediaRow, 
  InternetVelocidadMediaProvinciasRow, 
  InternetVelocidadRangosRow, 
  InternetIngresosRow
} from "@/lib/internet";

export function getInternetTecnologias() {
  return get<ApiResponse<InternetTecnologiaRow>>(
    "/api/v1/internet/accesos/tecnologias"
  );
}

export function getInternetTecnologiaProvincias() {
  return get<ApiResponse<InternetTecnologiaProvinciaRow>>(
    "/api/v1/internet/accesos/tecnologias/provincias"
  );
}

export function getInternetTecnologiaProvinciasLatest() {
  return get<ApiResponse<InternetTecnologiaProvinciaRow>>(
    "/api/v1/internet/accesos/tecnologias/provincias/latest"
  );
}

export function getInternetVelocidadMedia() {
  return get<ApiResponse<InternetVelocidadMediaRow>>(
    "/api/v1/internet/accesos/velocidad-media"
  );
}

export function getInternetVelocidadMediaProvinciasLatest() {
  return get<ApiResponse<InternetVelocidadMediaProvinciasRow>>(
    "/api/v1/internet/accesos/velocidad-media/provincias/latest"
  );
}

export function getInternetRangosVelocidad() {
  return get<ApiResponse<InternetVelocidadRangosRow>>(
    "/api/v1/internet/accesos/rangos-velocidad"
  );
}

export function getInternetPenetracion() {
  return get<ApiResponse<InternetPenetracionRow>>(
    "/api/v1/internet/penetracion"
  );
}

export function getInternetPenetracionProvincias() {
  return get<ApiResponse<InternetPenetracionProvinciaRow>>(
    "/api/v1/internet/penetracion/provincias"
  );
}

export function getInternetPenetracionProvinciasLatest() {
  return get<ApiResponse<InternetPenetracionProvinciaRow>>(
    "/api/v1/internet/penetracion/provincias/latest"
  );
}

export function getInternetIngresos() {
  return get<ApiResponse<InternetIngresosRow>>(
    "/api/v1/internet/ingresos"
  );
}