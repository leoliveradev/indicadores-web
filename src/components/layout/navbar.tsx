"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SERVICIOS = [
  {
    href: "/internet",
    label: "Internet",
    sub: "Accesos, tecnología, velocidad",
    color: "#005297",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#005297" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    href: "/comunicaciones-moviles",
    label: "Comunicaciones Móviles",
    sub: "Accesos, ingresos, SMS",
    color: "#E74242",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E74242" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
  },
  {
    href: "/telefonia-fija",
    label: "Telefonía Fija",
    sub: "Accesos, penetración, ingresos",
    color: "#003667",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#003667" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.87 12 19.79 19.79 0 0 1 1.87 3.4 2 2 0 0 1 3.85 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    href: "/tv",
    label: "Televisión por Suscripción",
    sub: "Accesos, penetración, ingresos",
    color: "#EEAE42",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BA7517" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="15" rx="2" />
        <path d="M17 2l-5 5-5-5" />
      </svg>
    ),
  },
  {
    href: "/portabilidad",
    label: "Portabilidad",
    sub: "Portabilidad numérica móvil",
    color: "#003667",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#003667" strokeWidth="1.8">
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
  },
  {
    href: "/mercado-postal",
    label: "Mercado Postal",
    sub: "Facturación, producción",
    color: "#ACAE22",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#636519" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown cuando se hace click afuera
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cerrar al navegar
  useEffect(() => { setOpen(false); }, [pathname]);

  const isServicioActive = SERVICIOS.some((s) => pathname.startsWith(s.href));

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-inner">
        {/* Logo ENACOM */}
        <Link href="/" className="navbar-brand">
          <div>
            {/* <div className="navbar-logo">EN<span style={{ fontWeight: 300 }}>∧</span>COM</div>
            <div className="navbar-logo-sub">Indicadores</div> */}
            <div className="navbar-logo">Indicadores</div>

          </div>
        </Link>

        <div className="navbar-divider" />

        <div className="nav-items">
          {/* Home */}
          <Link
            href="/"
            className={`nav-btn ${pathname === "/" ? "active" : ""}`}
          >
            Inicio
          </Link>

          {/* Servicios dropdown */}
          <div className="nav-item" ref={ref}>
            <button
              className={`nav-btn ${open ? "open" : ""} ${isServicioActive ? "active" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="true"
            >
              Servicios
              <ChevronDown />
            </button>

            <div className={`dropdown ${open ? "open" : ""}`} role="menu">
              <div className="dropdown-header">Sector TIC · Argentina</div>
              {SERVICIOS.map((s) => (
                <Link key={s.href} href={s.href} className="dropdown-item" role="menuitem">
                  <div className="dropdown-item-icon">{s.icon}</div>
                  <div>
                    <div className="dropdown-item-label">{s.label}</div>
                    <div className="dropdown-item-sub">{s.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Acerca de */}
          <Link
            href="/acerca-de"
            className={`nav-btn ${pathname === "/acerca-de" ? "active" : ""}`}
          >
            Acerca de
          </Link>
        </div>

      </div>
    </nav>
  );
}
