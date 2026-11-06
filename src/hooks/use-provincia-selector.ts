import { useMemo, useState } from "react";

type ProvinciaRow = {
  provincia: string;
};

export function useProvinciaSelector<
  T extends ProvinciaRow
>(
  rows: T[]
) {
  const [provincia, setProvincia] =
    useState("Argentina");

  const isArgentina =
    provincia === "Argentina";

  const provincias = useMemo(
    () =>
      [
        ...new Set(
          rows.map(
            (r) => r.provincia
          )
        ),
      ].sort(),
    [rows]
  );

  return {
    provincia,
    setProvincia,
    provincias,
    isArgentina,
  };
}