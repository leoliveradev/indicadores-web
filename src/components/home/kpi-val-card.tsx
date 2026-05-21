import Link from "next/link";
import { Tooltip } from "@/components/ui/tooltip-wrapper";
import styles from "@/components/home/kpi-val-card.module.css";

type Props = {
  label: string;
  sub?: string;
  icon: React.ReactNode;
  display: string | null;
  tooltip?: string;
  href?: string;
  variant?: "fija" | "internet" | "tv" | "movil";
};

export function KPIValCard({
  label,
  sub,
  icon,
  display,
  tooltip,
  href,
  variant,
}: Props) {
  const content =
    display === null ? (
      <div className={styles.skeleton} />
    ) : (
      <p className={`${styles.number} ${variant ? styles[variant] : ""}`}>
        {display}
      </p>
    );

  const CardContent = (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>

      <p className={styles.label}>
        {label}
        {sub && <span className={styles.sub}>{sub}</span>}
      </p>

      {tooltip ? (
        <Tooltip text={tooltip}>{content}</Tooltip>
      ) : (
        content
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={styles.linkWrapper}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}