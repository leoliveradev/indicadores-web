import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "ENACOM — Indicadores",
  description: "Series históricas del sector de telecomunicaciones de Argentina",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="layout-root">
          <Analytics />
          <Navbar />
          <div className="main-content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
