import { getPortabilidadMovil }
  from "@/lib/api/portabilidad";

import { PageHero }
  from "@/components/layout/page-hero";

import {
  PortabilidadOverview,
} from "@/components/portabilidad/portabilidad-overview";

import {
  PortabilidadMovil,
} from "@/components/portabilidad/portabilidad-movil";

export default async function PortabilidadPage() {
  const portabilidad =
    await getPortabilidadMovil();

  return (
    <>
      <PageHero
        title="Portabilidad Numérica"
        subtitle="Portabilidad móvil · Datos oficiales ENACOM"
      />

      <PortabilidadOverview
        data={portabilidad}
      />

      <PortabilidadMovil
        data={portabilidad}
      />
    </>
  );
}