export function MapTooltip({
  x,
  y,
  name,
  value,
}: {
  x: number;
  y: number;
  name: string;
  value: number;
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
      <div>Total: {value}</div>
    </div>
  );
}