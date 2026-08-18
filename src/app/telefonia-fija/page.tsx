import { getOverview } from "@/lib/api/home";

import {
  getTelefoniaFijaAccesos,
  getTelefoniaFijaAccesosProvinciasLatest,
  getTelefoniaFijaPenetracion,
  getTelefoniaFijaPenetracionProvinciasLatest,
  getTelefoniaFijaIngresos,
} from "@/lib/api/telefonia-fija";

import { fmtPeriod } from "@/lib/format";

import { PageHero } from "@/components/layout/page-hero";

import {
  TelefoniaFijaOverview,
} from "@/components/telefonia-fija/telefonia-fija-overview";

import {
  TelefoniaFijaTabs,
} from "@/components/telefonia-fija/telefonia-fija-tabs";

export default async function TelefoniaFijaPage() {
  const overview = await getOverview();

  const [
    accesos,
    accesosProvincias,
    penetracion,
    penetracionProvincias,
    ingresos,
  ] = await Promise.all([
    getTelefoniaFijaAccesos(),
    getTelefoniaFijaAccesosProvinciasLatest(),

    getTelefoniaFijaPenetracion(),
    getTelefoniaFijaPenetracionProvinciasLatest(),

    getTelefoniaFijaIngresos(),
  ]);

  const period = fmtPeriod(
    overview.periodo
  );

  return (
    <>
      <PageHero
        title="Telefonía fija en Argentina"
        subtitle={`${period} · Datos oficiales ENACOM`}
      />

      <TelefoniaFijaOverview
        data={overview}
      />

      <TelefoniaFijaTabs
        accesos={accesos}
        accesosProvincias={accesosProvincias}
        penetracion={penetracion}
        penetracionProvincias={penetracionProvincias}
        ingresos={ingresos}
      />
    </>
  );
}