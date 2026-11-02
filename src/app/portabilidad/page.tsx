import { getPortabilidadMovil }
  from "@/lib/api/portabilidad";

import { PageHero }
  from "@/components/layout/page-hero";

import { PortabilidadTabs } from "@/components/portabilidad/portabilidad-tabs";

export default async function PortabilidadPage() {
  const portabilidad =
    await getPortabilidadMovil();

  return (
    <>
      <PageHero
        title="Portabilidad Numérica"
        subtitle="Portabilidad móvil · Datos oficiales ENACOM"
      />

      <PortabilidadTabs
        data={portabilidad}
      />

    </>
  );
}