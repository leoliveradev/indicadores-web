import {
  getGeoProvincias,
  getGeoPartidos,
  getGeoLocalidades,
} from "@/lib/api/geo";

import {
  InternetAccesosVelocidadLocalidades,
} from "@/components/internet/internet-accesos-velocidad-localidades";

export default async function DemoPage() {
  const [
    provincias,
    partidos,
    localidades,
  ] = await Promise.all([
    getGeoProvincias(),
    getGeoPartidos(),
    getGeoLocalidades(),
  ]);

  return (
    <InternetAccesosVelocidadLocalidades
      provincias={provincias.data}
      partidos={partidos.data}
      localidades={localidades.data}
    />
  );
}