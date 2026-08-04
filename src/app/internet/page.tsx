import { getOverview } from "@/lib/api/home";
import {
  getInternetTecnologias, getInternetTecnologiaProvinciasLatest,
  getInternetVelocidadMedia, getInternetVelocidadMediaProvinciasLatest,
  getInternetRangosVelocidad,
  getInternetPenetracion, getInternetPenetracionProvinciasLatest
} from "@/lib/api/internet";
import { fmtPeriod } from "@/lib/format";

import { InternetOverview } from "@/components/internet/internet-overview";
import { InternetInsights } from "@/components/internet/internet-insights";
import { InternetTabs } from "@/components/internet/internet-tabs";

import {
  getTecnologiaDonutData,
  getVelocidadRangosDonutData
} from "@/lib/internet";
import { PageHero } from "@/components/layout/page-hero";

export default async function InternetPage() {
  const overview = await getOverview();

  const [
    tecnologias, tecnologiasProvincias, 
    velocidadMedia, velocidadMediaProvincias, 
    rangosVelocidad, 
    penetracion, penetracionProvincias
  ] = await Promise.all([
    getInternetTecnologias(),
    getInternetTecnologiaProvinciasLatest(),
    getInternetVelocidadMedia(),
    getInternetVelocidadMediaProvinciasLatest(),
    getInternetRangosVelocidad(),
    getInternetPenetracion(),
    getInternetPenetracionProvinciasLatest(),
  ]);

  const tecnologiaDonutData = getTecnologiaDonutData(tecnologias);
  const rangosDonutData = getVelocidadRangosDonutData(rangosVelocidad);

  const period = fmtPeriod(overview.periodo);


  return (
    <>
      {/* HERO */}
      <PageHero
        title="Internet fijo en Argentina"
        subtitle={`${period} · Datos oficiales ENACOM`}
      />

      {/* OVERVIEW */}
      <InternetOverview data={overview} />

      {/* INSIGHTS */}
      <InternetInsights
        tecnologiaData={tecnologiaDonutData}
        rangosData={rangosDonutData}

      />

      {/* EXPLORATION */}
      <InternetTabs
        tecnologias={tecnologias}
        tecnologiasProvincias={tecnologiasProvincias}
        velocidadMedia={velocidadMedia}
        velocidadMediaProvincias={velocidadMediaProvincias}
        penetracion={penetracion}
        penetracionProvincias={penetracionProvincias}
      />

    </>
  );
}