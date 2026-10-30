import { getOverview } from "@/lib/api/home";
import {
  getInternetTecnologias, getInternetTecnologiaProvinciasLatest,
  getInternetAccesosVelocidadProvincias,
  getInternetVelocidadMedia, getInternetVelocidadMediaProvinciasLatest,
  getInternetPenetracion, getInternetPenetracionProvinciasLatest,
  getInternetIngresos
} from "@/lib/api/internet";

import { InternetTabs } from "@/components/internet/internet-tabs";

import {
  getAccesosVelocidadDonutData,
  getTecnologiaDonutData
} from "@/lib/internet";

import { PageHero } from "@/components/layout/page-hero";
import { fmtPeriod } from "@/lib/format";

export default async function InternetPage() {
  const overview = await getOverview();

  const [
    tecnologias, tecnologiasProvincias,
    accesosVelocidad,
    velocidadMedia, velocidadMediaProvincias,
    penetracion, penetracionProvincias,
    ingresos
  ] = await Promise.all([
    getInternetTecnologias(),
    getInternetTecnologiaProvinciasLatest(),
    getInternetAccesosVelocidadProvincias(),
    getInternetVelocidadMedia(),
    getInternetVelocidadMediaProvinciasLatest(),
    getInternetPenetracion(),
    getInternetPenetracionProvinciasLatest(),
    getInternetIngresos()
  ]);

  const tecnologiaDonutData = getTecnologiaDonutData(tecnologias);
  const rangosDonutData =
    getAccesosVelocidadDonutData(
      accesosVelocidad.data
    );

  const period = fmtPeriod(overview.periodo);


  return (
    <>
      {/* HERO */}
      <PageHero
        title="Internet fijo en Argentina"
        subtitle={`${period} · Datos oficiales ENACOM`}
      />

      {/* EXPLORATION */}
      <InternetTabs
        overview={overview}
        tecnologiaDonutData={tecnologiaDonutData}
        rangosDonutData={rangosDonutData}
        tecnologias={tecnologias}
        tecnologiasProvincias={tecnologiasProvincias}
        accesosVelocidad={accesosVelocidad}
        velocidadMedia={velocidadMedia}
        velocidadMediaProvincias={velocidadMediaProvincias}
        penetracion={penetracion}
        penetracionProvincias={penetracionProvincias}
        ingresos={ingresos}
      />

    </>
  );
}