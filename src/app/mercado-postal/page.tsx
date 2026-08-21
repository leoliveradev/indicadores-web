import { PageHero }
  from "@/components/layout/page-hero";

import {
  MercadoPostalOverview,
} from "@/components/mercado-postal/mercado-postal-overview";

import {
  MercadoPostalTabs,
} from "@/components/mercado-postal/mercado-postal-tabs";

import {
  getMercadoPostalFacturacion,
  getMercadoPostalProduccion,
  getMercadoPostalPersonal,
  getMercadoPostalProvinciasLatest,
} from "@/lib/api/mercado-postal";

export default async function MercadoPostalPage() {
  const [
    facturacion,
    produccion,
    personal,
    provincias,
  ] = await Promise.all([
    getMercadoPostalFacturacion(),
    getMercadoPostalProduccion(),
    getMercadoPostalPersonal(),
    getMercadoPostalProvinciasLatest(),
  ]);

  return (
    <>
      <PageHero
        title="Mercado Postal Argentino"
        subtitle="Facturación, producción, empleo y distribución provincial"
      />

      <MercadoPostalOverview
        facturacion={facturacion}
        personal={personal}
      />

      <MercadoPostalTabs
        facturacion={facturacion}
        produccion={produccion}
        personal={personal}
        provincias={provincias}
      />
    </>
  );
}