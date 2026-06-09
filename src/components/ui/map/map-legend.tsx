export function MapLegend({
  scale,
}: {
  scale: any;
}) {
  const range = scale.range();

  return (
    <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
      {range.map((color: string, i: number) => {
        const [min, max] = scale.invertExtent(color);

        return (
          <div key={i} style={{ textAlign: "center", fontSize: 10 }}>
            <div
              style={{
                width: 30,
                height: 10,
                background: color,
              }}
            />
            <div>{Math.round(min ?? 0)}</div>
          </div>
        );
      })}
    </div>
  );
}