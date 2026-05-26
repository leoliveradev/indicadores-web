import { get } from "@/lib/api/client"; 
import { ApiResponse, InternetPenetracionRow, InternetTecnologiaProvinciaRow, InternetTecnologiaRow, InternetVelocidadMediaRow } from "@/lib/types";

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

export function getInternetVelocidadMedia() {
  return get<ApiResponse<InternetVelocidadMediaRow>>(
    "/api/v1/internet/accesos/velocidad-media"
  );
}

export function getInternetPenetracion() {
  return get<ApiResponse<InternetPenetracionRow>>(
    "/api/v1/internet/penetracion"
  );
}
