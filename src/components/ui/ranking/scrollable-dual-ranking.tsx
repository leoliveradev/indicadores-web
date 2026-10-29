"use client";

import { dispValue } from "@/lib/format";

export type DualRankingItem = {
  id: string;
  label: string;

  primary: number;
  secondary: number;
};

type Props = {
  title: string;

  items: DualRankingItem[];

  primaryLabel: string;
  secondaryLabel: string;

  selectedId?: string;

  onSelect?: (id: string) => void;

  primaryFormatter?: (value: number) => string;
  secondaryFormatter?: (value: number) => string;

  maxHeight?: number;
};

export function ScrollableDualRanking({
  title,
  items,
  primaryLabel,
  secondaryLabel,
  selectedId,
  onSelect,
  primaryFormatter = (v) =>
    dispValue(v, {
      format: "number",
      decimals: 2,
    }),
  secondaryFormatter = (v) =>
    dispValue(v, {
      format: "number",
      decimals: 2,
    }),
  maxHeight = 520,
}: Props) {
  return (
    <div className="dual-ranking-card">
      <div className="dual-ranking-header">
        {title}
      </div>

      <div
        className="dual-ranking-list"
        style={{ maxHeight }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`dual-ranking-item ${
              selectedId === item.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              onSelect?.(item.id)
            }
          >
            <div className="dual-ranking-title">
              <span className="dual-ranking-position">
                {index + 1}.
              </span>

              <span className="dual-ranking-label">
                {item.label}
              </span>
            </div>

            <div className="dual-ranking-metrics">
              <div className="dual-ranking-metric">
                <span className="dual-ranking-metric-label">
                  {primaryLabel}
                </span>

                <strong className="dual-ranking-metric-value primary">
                  {primaryFormatter(item.primary)}
                </strong>
              </div>

              <div className="dual-ranking-metric">
                <span className="dual-ranking-metric-label">
                  {secondaryLabel}
                </span>

                <strong className="dual-ranking-metric-value secondary">
                  {secondaryFormatter(
                    item.secondary
                  )}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}