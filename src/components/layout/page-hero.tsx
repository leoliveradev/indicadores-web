type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="home-hero">
      <div className="home-hero-inner">

        {subtitle && (
          <div className="home-period-badge">
            {subtitle}
          </div>
        )}

        <h1 className="home-title">
          {title}
        </h1>

      </div>
    </div>
  );
}