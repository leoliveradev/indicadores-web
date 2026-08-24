"use client";

import type { PeriodFilterValue }
  from "@/lib/utils/filter-period";

type Props = {
  value: PeriodFilterValue;
  onChange: (
    value: PeriodFilterValue
  ) => void;
};

const OPTIONS: {
  value: PeriodFilterValue;
  label: string;
}[] = [
  {
    value: "all",
    label: "Todo",
  },
  {
    value: "10y",
    label: "10 años",
  },
  {
    value: "5y",
    label: "5 años",
  },
  {
    value: "3y",
    label: "3 años",
  },
  {
    value: "1y",
    label: "1 año",
  },
];

export function PeriodFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`tab-btn ${
            value === option.value
              ? "active"
              : ""
          }`}
          onClick={() =>
            onChange(option.value)
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}