export function Section({ title, alt, children }: { 
  title: string; 
  alt?: boolean; 
  children: React.ReactNode 
}) {
  return (
    <div className={`section-wrap${alt ? " alt" : ""}`}>
      <div className="section-inner">
        <h2 className="section-heading">{title}</h2>
        <div className="kpi-cards-grid">{children}</div>
      </div>
    </div>
  );
}