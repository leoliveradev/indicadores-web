import { Overview } from "@/lib/types";

export function mapInternetOverview(data: Overview) {
  return {
    accesos: data.accesos.internet,
    penetracion: data.penetracion.internet,
    ingresos: data.ingresos.internet,
    velocidad: data.miscelaneas.velocidad_mbps,
    fibraPct: data.miscelaneas.fibra_pct,
  };
}