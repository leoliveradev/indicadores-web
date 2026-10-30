type LegendScale = {
  range(): string[];
  invertExtent(color: string): [
    number | undefined,
    number | undefined,
  ];
};

export function MapLegend({
  scale,
  formatter
}: {
  scale: LegendScale;
  formatter?: (
    value: number
  ) => string;
}) {
  const range = scale.range();

  return (
    <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
      {range.map((color: string, i: number) => {
        const extent =
          scale.invertExtent(color);

        const min = extent[0];

        return (
          <div key={i} style={{ textAlign: "center", fontSize: 10 }}>
            <div
              style={{
                width: 30,
                height: 10,
                background: color,
              }}
            />
            <div>
              {formatter
                ? formatter(min ?? 0)
                : Math.round(min ?? 0)}
            </div>
          </div>
        );
      })}
    </div>
  );
}