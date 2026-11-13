import { PageHero }
  from "@/components/layout/page-hero";

import {
  MercadoPostalTabs,
} from "@/components/mercado-postal/mercado-postal-tabs";

import {
  getMercadoPostalFacturacion,
  getMercadoPostalProduccion,
  getMercadoPostalPersonal,
  getMercadoPostalFacturacionProduccionProvincias,
  getMercadoPostalProvinciasLatest,
} from "@/lib/api/mercado-postal";

export default async function MercadoPostalPage() {
  const [
    facturacion,
    produccion,
    personal,
    facturacionProduccionProvincias,
    provincias,
  ] = await Promise.all([
    getMercadoPostalFacturacion(),
    getMercadoPostalProduccion(),
    getMercadoPostalPersonal(),
    getMercadoPostalFacturacionProduccionProvincias(),
    getMercadoPostalProvinciasLatest(),
  ]);

  return (
    <>
      <PageHero
        title="Mercado Postal Argentino"
        subtitle="Facturación, producción, empleo y distribución provincial"
      />

      <MercadoPostalTabs
        facturacion={facturacion}
        produccion={produccion}
        facturacionProduccionProvincias={facturacionProduccionProvincias}
        personal={personal}
        provincias={provincias}
      />
    </>
  );
}