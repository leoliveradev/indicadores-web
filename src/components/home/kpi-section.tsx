import { Section } from "@/components/home/section";
import { KPIValCard } from "@/components/home/kpi-val-card";

export type KPIItem = {
  label: string;
  icon: React.ComponentType;
  value: number;
  format: (v: number) => string | null;
  tooltip?: string;
  href?: string;
};

export function KPISection({
  title,
  items,
  alt,
}: {
  title: string;
  items: KPIItem[];
  alt?: boolean;
}) {
  return (
    <Section title={title} alt={alt}>
      {items.map((item, i) => {
        const Icon = item.icon;

        return (
          <KPIValCard
            key={i}
            label={item.label}
            icon={<Icon />}
            display={item.format(item.value)}
            tooltip={item.tooltip}
            // href={item.href}
          />
        );
      })}
    </Section>
  );
}