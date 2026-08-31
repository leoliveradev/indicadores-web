import type { Insight } from "@/lib/types";

function getInsightIcon(
  type?: Insight["type"]
) {
  switch (type) {
    case "trend":
      return "📈";

    case "record":
      return "🏆";

    case "warning":
      return "⚠️";

    case "highlight":
      return "💡";

    default:
      return "💡";
  }
}

export function InsightsCard({
  insights,
}: {
  insights: Insight[];
}) {
  if (!insights.length) return null;

  return (
    <div className="space-y-2 mt-4">
      {insights.map((item) => (
        <p key={item.title}>
          <span>
            {getInsightIcon(
              item.type
            )}
          </span>
          <strong> {item.title}:</strong> {item.text}
        </p>
      ))}
    </div>
  );
}