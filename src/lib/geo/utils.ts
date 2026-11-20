import { LocalidadGeo, PartidoGeo, ProvinciaGeo } from "./types";

export function getGeoProvinciasOptions(
  provincias: ProvinciaGeo[]
) {
  return provincias
    .map((p) => p.provincia)
    .sort();
}

export function getPartidosByProvincia(
  provinciaId: number,
  partidos: PartidoGeo[]
) {
  return partidos
    .filter(
      (p) =>
        p.provincia_id === provinciaId
    )
    .map(
      (p) => p.partido
    )
    .sort();
}

export function getLocalidadesByPartido(
  partidoId: number,
  localidades: LocalidadGeo[]
) {
  return localidades
    .filter(
      (l) =>
        l.partido_id === partidoId
    )
    .map(
      (l) => l.localidad
    )
    .sort();
}