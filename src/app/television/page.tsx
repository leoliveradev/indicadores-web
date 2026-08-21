import { getOverview }
  from "@/lib/api/home";

import {
  getTelevisionAccesos,
  getTelevisionAccesosProvinciasLatest,
  getTelevisionPenetracion,
  getTelevisionPenetracionProvinciasLatest,
  getTelevisionIngresos,
} from "@/lib/api/television";

import { fmtPeriod }
  from "@/lib/format";

import { PageHero }
  from "@/components/layout/page-hero";

import {
  TelevisionOverview,
} from "@/components/television/television-overview";

import {
  TelevisionTabs,
} from "@/components/television/television-tabs";

export default async function TelevisionPage() {
  const overview = await getOverview();

  const [
    accesos,
    accesosProvincias,
    penetracion,
    penetracionProvincias,
    ingresos,
  ] = await Promise.all([
    getTelevisionAccesos(),
    getTelevisionAccesosProvinciasLatest(),

    getTelevisionPenetracion(),
    getTelevisionPenetracionProvinciasLatest(),

    getTelevisionIngresos(),
  ]);

  const period =
    fmtPeriod(overview.periodo);

  return (
    <>
      <PageHero
        title="Televisión por suscripción en Argentina"
        subtitle={`${period} · Datos oficiales ENACOM`}
      />

      <TelevisionOverview
        data={overview}
      />

      <TelevisionTabs
        accesos={accesos}
        accesosProvincias={accesosProvincias}
        penetracion={penetracion}
        penetracionProvincias={penetracionProvincias}
        ingresos={ingresos}
      />
    </>
  );
}