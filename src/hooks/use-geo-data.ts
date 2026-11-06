import { useEffect, useState } from "react";

import type {
  FeatureCollection,
  Geometry,
} from "geojson";

export function useGeoData() {
  const [geo, setGeo] =
    useState<FeatureCollection<Geometry> | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "/geo/ar-provincias.json"
      );

      const data:
        FeatureCollection<Geometry> =
        await res.json();

      setGeo(data);
    }

    load();
  }, []);

  return geo;
}