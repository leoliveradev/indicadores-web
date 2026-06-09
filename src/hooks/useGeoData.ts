import { useEffect, useState } from "react";

export function useGeoData() {
  const [geo, setGeo] = useState<any>(null);

  useEffect(() => {
    fetch("/geo/ar-provincias.json")
      .then((res) => res.json())
      .then(setGeo);
  }, []);

  return geo;
}