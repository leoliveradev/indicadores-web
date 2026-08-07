import { getOverview } from "@/lib/api/home";

import {
  getMovilesAccesos,
  getMovilesPenetracion,
  getMovilesIngresos,
  getMovilesLlamadas,
  getMovilesMinutos,
  getMovilesSms,
} from "@/lib/api/comunicaciones-moviles";

import { fmtPeriod } from "@/lib/format";

import { PageHero } from "@/components/layout/page-hero";

import { ComunicacionesMovilesOverview }
  from "@/components/comunicaciones-moviles/comunicaciones-moviles-overview";

import { ComunicacionesMovilesTabs }
  from "@/components/comunicaciones-moviles/comunicaciones-moviles-tabs";

export default async function ComunicacionesMovilesPage() {
  const overview = await getOverview();

  const [
    accesos,
    penetracion,
    ingresos,
    llamadas,
    minutos,
    sms,
  ] = await Promise.all([
    getMovilesAccesos(),
    getMovilesPenetracion(),
    getMovilesIngresos(),
    getMovilesLlamadas(),
    getMovilesMinutos(),
    getMovilesSms(),
  ]);

  const period = fmtPeriod(
    overview.periodo
  );

  return (
    <>
      <PageHero
        title="Comunicaciones móviles en Argentina"
        subtitle={`${period} · Datos oficiales ENACOM`}
      />

      <ComunicacionesMovilesOverview
        data={overview}
      />

      <ComunicacionesMovilesTabs
        accesos={accesos}
        penetracion={penetracion}
        ingresos={ingresos}
        llamadas={llamadas}
        minutos={minutos}
        sms={sms}
      />
    </>
  );
}