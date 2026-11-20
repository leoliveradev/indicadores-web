import { get } from "@/lib/api/client"; 

import type { ApiResponse } from "@/lib/types";
import type {
  InternetPenetracionProvinciaRow, InternetPenetracionRow, 
  InternetTecnologiaProvinciaRow, InternetTecnologiaRow, 
  InternetAccesosVelocidadRow,
  InternetVelocidadMediaRow, 
  InternetVelocidadMediaProvinciasRow,
  InternetIngresosRow,
  InternetAccesosVelocidadLocalidadRow,
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

export function getInternetAccesosVelocidadProvincias() {
  return get<ApiResponse<InternetAccesosVelocidadRow>>(
    "/api/v1/internet/accesos/velocidad/provincias/latest"
  );
}

type AccesosVelocidadLocalidadesParams = {
  provincia?: string;
  partido?: string;
  localidad?: string;
  page?: number;
  limit?: number;
};

export function getInternetAccesosVelocidadLocalidades(
  params?: AccesosVelocidadLocalidadesParams
) {
  const searchParams =
    new URLSearchParams();

  if (params?.provincia) {
    searchParams.set(
      "provincia",
      params.provincia
    );
  }

  if (params?.partido) {
    searchParams.set(
      "partido",
      params.partido
    );
  }

  if (params?.localidad) {
    searchParams.set(
      "localidad",
      params.localidad
    );
  }

  if (params?.page) {
    searchParams.set(
      "page",
      String(params.page)
    );
  }

  if (params?.limit) {
    searchParams.set(
      "limit",
      String(params.limit)
    );
  }

  const query =
    searchParams.toString();

  return get<
    ApiResponse<
      InternetAccesosVelocidadLocalidadRow
    >
  >(
    `/api/v1/internet/accesos/velocidad/localidades${
      query ? `?${query}` : ""
    }`
  );
}

export function getInternetVelocidadMedia() {
  return get<ApiResponse<InternetVelocidadMediaRow>>(
    "/api/v1/internet/accesos/velocidad-media"
  );
}

export function getInternetVelocidadMediaProvincias() {
  return get<ApiResponse<InternetVelocidadMediaProvinciasRow>>(
    "/api/v1/internet/accesos/velocidad-media/provincias"
  );
}

export function getInternetVelocidadMediaProvinciasLatest() {
  return get<ApiResponse<InternetVelocidadMediaProvinciasRow>>(
    "/api/v1/internet/accesos/velocidad-media/provincias/latest"
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