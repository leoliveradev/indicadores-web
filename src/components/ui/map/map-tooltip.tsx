export function MapTooltip({
  x,
  y,
  name,
  value,
  velocidad,
  hogares,
  habitantes,
}: {
  x: number;
  y: number;
  name: string;
  value?: number | string;
  velocidad?: number;
  hogares?: number;
  habitantes?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: y + 10,
        left: x + 10,
        pointerEvents: "none",
        background: "white",
        border: "1px solid #ddd",
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <strong>{name}</strong>

      {velocidad !== undefined ? (
        <div>
          Velocidad media: {velocidad.toFixed(1)} Mbps
        </div>
      ) : hogares !== undefined &&
        habitantes !== undefined ? (
        <>
          <div>
            Hogares: {hogares.toFixed(2)}
          </div>

          <div>
            Habitantes: {habitantes.toFixed(2)}
          </div>
        </>
      ) : (
        <div>
          Accesos: {value}
        </div>
      )}

    </div>
  );
}