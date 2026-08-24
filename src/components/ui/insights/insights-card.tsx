import type { Insight } from "@/lib/types";

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
          💡 <strong>{item.title}:</strong> {item.text}
        </p>
      ))}
    </div>
  );
}