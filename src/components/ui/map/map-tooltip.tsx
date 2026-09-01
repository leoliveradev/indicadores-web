import type {
  TooltipItem,
} from "@/lib/maps/types";

type Props = {
  x: number;
  y: number;

  name: string;

  value: number;

  tooltipData?: TooltipItem[];
};

export function MapTooltip({
  x,
  y,
  name,
  value,
  tooltipData,
}: Props) {
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

      {tooltipData?.length ? (
        <div
          style={{
            marginTop: 6,
          }}
        >
          {tooltipData.map((item) => (
            <div key={item.label}>
              <span
                style={{
                  color: item.color,
                  fontWeight: 600,
                }}
              >
                {item.label}:
              </span>{" "}
              {item.value}
            </div>
          ))}
        </div>
      ) : (
        <div>
          Accesos:{" "}
          {value.toLocaleString("es-AR")}
        </div>
      )}
    </div>
  );
}