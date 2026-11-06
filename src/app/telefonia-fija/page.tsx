import { getOverview } from "@/lib/api/home";

import {
  getTelefoniaFijaAccesos,
  getTelefoniaFijaAccesosProvincias,
  getTelefoniaFijaAccesosProvinciasLatest,
  getTelefoniaFijaPenetracion,
  getTelefoniaFijaPenetracionProvincias,
  getTelefoniaFijaPenetracionProvinciasLatest,
  getTelefoniaFijaIngresos,
} from "@/lib/api/telefonia-fija";

import { fmtPeriod } from "@/lib/format";

import { PageHero } from "@/components/layout/page-hero";

import {
  TelefoniaFijaTabs,
} from "@/components/telefonia-fija/telefonia-fija-tabs";

export default async function TelefoniaFijaPage() {
  const overview = await getOverview();

  const [
    accesos,
    accesosProvincias,
    accesosProvinciasLatest,
    penetracion,
    penetracionProvincias,
    penetracionProvinciasLatest,
    ingresos,
  ] = await Promise.all([
    getTelefoniaFijaAccesos(),
    getTelefoniaFijaAccesosProvincias(),
    getTelefoniaFijaAccesosProvinciasLatest(),
    getTelefoniaFijaPenetracion(),
    getTelefoniaFijaPenetracionProvincias(),
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

      <TelefoniaFijaTabs
        overview={overview}
        accesos={accesos}
        accesosProvincias={accesosProvincias}
        accesosProvinciasLatest={accesosProvinciasLatest}
        penetracion={penetracion}
        penetracionProvincias={penetracionProvincias}
        penetracionProvinciasLatest={penetracionProvinciasLatest}
        ingresos={ingresos}
      />
    </>
  );
}