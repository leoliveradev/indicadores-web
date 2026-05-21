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
          Sección en desarrollo. Pronto estará disponible con datos oficiales de ENACOM.
        </p>
      </div>
    </>
  );
}
