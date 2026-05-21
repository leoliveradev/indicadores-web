import { getOverview } from "@/lib/api/home";
import { getAccesosItems, getFacturacionItems, getMiscelaneasItems, getPenetrationItems, getPortabilidadItems, getPostalItems } from "@/lib/home/sections";
import { KPISection } from "@/components/home/kpi-section";
import { fmtPeriod } from "@/lib/format";
import { PageHero } from "@/components/layout/page-hero";


export default async function HomePage() {
  const data = await getOverview();

  const period = fmtPeriod(data.periodo);

  return (
    <>
      {/* HERO */}

      <PageHero
        title="Indicadores del sector TIC en Argentina"
        subtitle={`${period} · Datos oficiales ENACOM`}
      />

      {/* SECTIONS */}
      <KPISection
        title="Accesos"
        items={getAccesosItems(data)}
      />

      <KPISection
        title="Penetración"
        items={getPenetrationItems(data)}
      />

      <KPISection
        title="Portabilidad"
        items={getPortabilidadItems(data)}
      />

      <KPISection
        title="Misceláneas"
        items={getMiscelaneasItems(data)}
      />

      <KPISection
        title="Facturación"
        items={getFacturacionItems(data)}
      />

      <KPISection
        title="Mercado Postal"
        items={getPostalItems(data)}
      />

    </>
  );
}