import { getOverview } from "@/lib/api/home";
import {
  getInternetTecnologias, getInternetTecnologiaProvincias,
  getInternetVelocidadMedia,
  getInternetRangosVelocidad,
  getInternetPenetracion, getInternetPenetracionProvincias
} from "@/lib/api/internet";
import { fmtPeriod } from "@/lib/format";

import { InternetOverview } from "@/components/internet/internet-overview";
import { InternetInsights } from "@/components/internet/internet-insights";
import { InternetTabs } from "@/components/internet/internet-tabs";

import {
  // getLatestTecnologiaProvinciaData,
  getTecnologiaDonutData,
  // getVelocidadGaugeData,
  getVelocidadRangosDonutData 
} from "@/lib/internet/sections";
import { PageHero } from "@/components/layout/page-hero";

export default async function InternetPage() {
  const overview = await getOverview();

  const [tecnologias, tecnologiasProvincias, velocidadMedia, rangosVelocidad, penetracion, penetracionProvincias] = await Promise.all([
    getInternetTecnologias(),
    getInternetTecnologiaProvincias(),
    getInternetVelocidadMedia(),
    getInternetRangosVelocidad(),
    getInternetPenetracion(),
    getInternetPenetracionProvincias(),
  ]);

  const tecnologiaDonutData = getTecnologiaDonutData(tecnologias);
  // const gaugeData = getVelocidadGaugeData(velocidadMedia);
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
        // gaugeData={gaugeData}
        rangosData={rangosDonutData}

      />

      {/* EXPLORATION */}
      <InternetTabs
        tecnologias={tecnologias}
        tecnologiasProvincias={tecnologiasProvincias}
        penetracion={penetracion}
        penetracionProvincias={penetracionProvincias}
      />

    </>
  );
}