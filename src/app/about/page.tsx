import { PageHero } from "@/components/layout/page-hero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Indicadores de Telecomunicaciones en Argentina"
        subtitle="Datos oficiales ENACOM"
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Sobre el proyecto
          </h2>

          <p className="chart-description">
            Indicadores es una plataforma de visualización y análisis de datos
            históricos del sector de telecomunicaciones argentino. El objetivo
            es transformar información pública en herramientas accesibles para
            explorar tendencias, evaluar la evolución de los servicios y
            comprender mejor el comportamiento del sector a lo largo del tiempo.
          </p>

        </div>
      </section>

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Fuentes de datos
          </h2>

          <p className="chart-description">
            Los datos utilizados provienen de publicaciones oficiales de ENACOM.
            La información es recolectada, normalizada y expuesta mediante una
            API propia para facilitar su análisis y visualización.
          </p>

        </div>
      </section>

    </>
  );
}