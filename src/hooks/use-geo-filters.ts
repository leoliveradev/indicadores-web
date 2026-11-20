import { useMemo, useState } from "react";

import type {
  ProvinciaGeo,
  PartidoGeo,
  LocalidadGeo,
} from "@/lib/geo";

type Props = {
  provincias: ProvinciaGeo[];
  partidos: PartidoGeo[];
  localidades: LocalidadGeo[];
};

export function useGeoFilters({
  provincias,
  partidos,
  localidades,
}: Props) {
  const [provinciaId, setProvinciaIdState] =
    useState<number | null>(null);

  const [partidoId, setPartidoIdState] =
    useState<number | null>(null);

  const [localidadId, setLocalidadIdState] =
    useState<number | null>(null);

  const provincia =
    useMemo(
      () =>
        provincias.find(
          (p) =>
            p.id === provinciaId
        ) ?? null,
      [provincias, provinciaId]
    );

  const partido =
    useMemo(
      () =>
        partidos.find(
          (p) =>
            p.id === partidoId
        ) ?? null,
      [partidos, partidoId]
    );

  const localidad =
    useMemo(
      () =>
        localidades.find(
          (l) =>
            l.id === localidadId
        ) ?? null,
      [localidades, localidadId]
    );

  const partidosDisponibles =
    useMemo(() => {
      if (!provinciaId) {
        return [];
      }

      return partidos
        .filter(
          (p) =>
            p.provincia_id ===
            provinciaId
        )
        .sort((a, b) =>
          a.partido.localeCompare(
            b.partido,
            "es"
          )
        );
    }, [
      provinciaId,
      partidos,
    ]);

  const localidadesDisponibles =
    useMemo(() => {
      if (!partidoId) {
        return [];
      }

      return localidades
        .filter(
          (l) =>
            l.partido_id ===
            partidoId
        )
        .sort((a, b) =>
          a.localidad.localeCompare(
            b.localidad,
            "es"
          )
        );
    }, [
      partidoId,
      localidades,
    ]);

  const setProvinciaId = (
    value: number | null
  ) => {
    setProvinciaIdState(value);
    setPartidoIdState(null);
    setLocalidadIdState(null);
  };

  const setPartidoId = (
    value: number | null
  ) => {
    setPartidoIdState(value);
    setLocalidadIdState(null);
  };

  return {
    provinciaId,
    partidoId,
    localidadId,

    provincia,
    partido,
    localidad,

    partidosDisponibles,
    localidadesDisponibles,

    setProvinciaId,
    setPartidoId,
    setLocalidadId:
      setLocalidadIdState,
  };
}