import { getOverview } from "@/lib/api/home";
import {
  getInternetTecnologias,
  getInternetVelocidadMedia
} from "@/lib/api/internet";
import { fmtPeriod } from "@/lib/format";

import { InternetOverview } from "@/components/internet/internet-overview";
import { InternetInsights } from "@/components/internet/internet-insights";
import { InternetTabs } from "@/components/internet/internet-tabs";

import {
  getTecnologiaDonutData,
  getVelocidadGaugeData
} from "@/lib/internet/sections";
import { PageHero } from "@/components/layout/page-hero";

export default async function InternetPage() {
  const data = await getOverview();

  const [tecnologias, velocidadMedia] = await Promise.all([
    getInternetTecnologias(),
    getInternetVelocidadMedia(),
  ]);

  const donutData = getTecnologiaDonutData(tecnologias);
  const gaugeData = getVelocidadGaugeData(velocidadMedia);

  const period = fmtPeriod(data.periodo);

  return (
    <>
      {/* HERO */}
      <PageHero
        title="Internet fijo en Argentina"
        subtitle={`${period} · Datos oficiales ENACOM`}
      />

      {/* OVERVIEW */}
      <InternetOverview data={data} />

      {/* INSIGHTS */}
      <InternetInsights
        donutData={donutData}
        gaugeData={gaugeData}
      />


      {/* EXPLORATION */}
      <InternetTabs tecnologias={tecnologias} />    </>
  );
}