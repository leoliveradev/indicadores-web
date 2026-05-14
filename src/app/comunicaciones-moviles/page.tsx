"use client";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="svc-page-header">
        <div className="svc-page-header-inner">
          <p className="svc-breadcrumb"><Link href="/">Inicio</Link> / Comunicaciones Móviles</p>
          <h1 className="svc-title">Comunicaciones Móviles</h1>
        </div>
      </div>
      <div className="page">
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          Sección en desarrollo. Usá <code style={{ background: "#f4f6f9", padding: "1px 6px", borderRadius: 4 }}>
            app/internet/tecnologias/page.tsx
          </code> como plantilla.
        </p>
      </div>
    </>
  );
}
