import styles from "./tooltip.module.css";

export function Tooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <span className={styles.container}>
      {children}
      <span className={styles.tooltip}>{text}</span>
    </span>
  );
}