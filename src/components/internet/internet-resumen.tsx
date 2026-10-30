import type { Overview } from "@/lib/home/types";
import type { DonutItem } from "@/components/ui/charts/donut-chart";

import { InternetOverview } from "./internet-overview";
import { InternetInsights } from "./internet-insights";

type Props = {
  overview: Overview;
  tecnologiaData: DonutItem[];
  rangosData: DonutItem[];
};

export function InternetResumen({
  overview,
  tecnologiaData,
  rangosData,
}: Props) {
  return (
    <>
      <InternetOverview
        data={overview}
      />

      <InternetInsights
        tecnologiaData={tecnologiaData}
        rangosData={rangosData}
      />
    </>
  );
}