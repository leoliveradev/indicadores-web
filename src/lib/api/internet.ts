import { get } from "@/lib/api/client"; 
import { ApiResponse, 
  InternetPenetracionProvinciaRow, InternetPenetracionRow, 
  InternetTecnologiaProvinciaRow, InternetTecnologiaRow, 
  InternetVelocidadMediaRow, 
  InternetVelocidadRangosRow 
} from "@/lib/types";

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
