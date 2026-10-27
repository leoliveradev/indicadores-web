"use client";

import { dispValue } from "@/lib/format";

export type RankingItem = {
  id: string;
  label: string;
  value: number;
};

type Props = {
  title: string;
  items: RankingItem[];

  selectedId?: string;

  onSelect?: (id: string) => void;

  formatter?: (value: number) => string;

  maxHeight?: number;
};

export function ScrollableRanking({
  title,
  items,
  selectedId,
  onSelect,
  formatter = (v) =>
    dispValue(v, {
      format: "number",
      decimals: 0,
    }),
  maxHeight = 520,
}: Props) {
  return (
    <div className="ranking-card">
      <div className="ranking-header">
        {title}
      </div>

      <div
        className="ranking-list"
        style={{ maxHeight }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`ranking-item ${selectedId === item.id
                ? "active"
                : ""
              }`}
            onClick={() =>
              onSelect?.(item.id)
            }
          >
            <div className="ranking-label">
              <span className="ranking-position">
                {index + 1}.
              </span>

              <span>
                {item.label}
              </span>
            </div>

            <div className="ranking-value">
              {formatter(item.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}