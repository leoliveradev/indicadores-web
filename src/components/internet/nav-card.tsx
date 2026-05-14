import Link from "next/link";

export function NavCard({
  href, icon, title, desc, badge,
}: {
  href: string; 
  icon?: React.ReactNode; 
  title: string; 
  desc: string; 
  badge?: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        background: "#fff", border: "0.5px solid rgba(11,23,66,0.12)",
        borderRadius: 10, padding: "16px", cursor: "pointer",
        transition: "border-color 0.15s, box-shadow 0.15s",
        display: "flex", flexDirection: "column", gap: 6, height: "100%",
      }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#00B5E5";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,181,229,0.12)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(11,23,66,0.12)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div style={{ width: 32, height: 32, borderRadius: 7, background: "#BCE4F4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
          {icon}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#0B1742" }}>{title}</div>
        <div style={{ fontSize: 10, color: "#666", lineHeight: 1.5, flex: 1 }}>{desc}</div>
        {badge && (
          <span style={{ fontSize: 10, background: "#BCE4F4", color: "#005297", padding: "2px 8px", borderRadius: 20, display: "inline-block", fontWeight: 500, marginTop: 2 }}>
            {badge}
          </span>
        )}
        <div style={{ fontSize: 11, color: "#0074A6", fontWeight: 500 }}>Ver detalle →</div>
      </div>
    </Link>
  );
}