import { getOverview } from "@/lib/api/home";
import {
  getInternetTecnologias,
  getInternetTecnologiaProvincias,
  getInternetVelocidadMedia
} from "@/lib/api/internet";
import { fmtPeriod } from "@/lib/format";

import { InternetOverview } from "@/components/internet/internet-overview";
import { InternetInsights } from "@/components/internet/internet-insights";
import { InternetTabs } from "@/components/internet/internet-tabs";

import {
  getLatestTecnologiaProvinciaData,
  getTecnologiaDonutData,
  getVelocidadGaugeData
} from "@/lib/internet/sections";
import { PageHero } from "@/components/layout/page-hero";

export default async function InternetPage() {
  const overview = await getOverview();

  const [tecnologias, tecnologiasProvincias, velocidadMedia] = await Promise.all([
    getInternetTecnologias(),
    getInternetTecnologiaProvincias(),
    getInternetVelocidadMedia(),
  ]);

  const donutData = getTecnologiaDonutData(tecnologias);
  const gaugeData = getVelocidadGaugeData(velocidadMedia);

  const period = fmtPeriod(overview.periodo);

  // console.log("provincias", tecnologiasProvincias.data.slice(0, 5));
  // console.log(
  //   "periodos únicos",
  //   [...new Set(tecnologiasProvincias.data.map(d => `${d.anio}-T${d.trimestre}`))]
  // );

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
        donutData={donutData}
        gaugeData={gaugeData}
      />

      {/* EXPLORATION */}
      <InternetTabs
        tecnologias={tecnologias}
        tecnologiasProvincias={tecnologiasProvincias}
      />

    </>
  );
}