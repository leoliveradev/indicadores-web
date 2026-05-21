import { KPISection } from "@/components/home/kpi-section";
import { getInternetOverviewItems } from "@/lib/internet/sections";
import { Overview } from "@/lib/types";

export function InternetOverview({ data }: { data: Overview }) {
  return (
    <KPISection
      title="Resumen general"
      items={getInternetOverviewItems(data)}
    />
  );
}