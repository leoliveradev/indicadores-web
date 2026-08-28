"use client";

import type {
  SeasonalityPeriodValue,
} from "@/lib/utils/seasonality-period";

type Props = {
  value: SeasonalityPeriodValue;
  onChange: (
    value: SeasonalityPeriodValue
  ) => void;
};

const OPTIONS: {
  value: SeasonalityPeriodValue;
  label: string;
}[] = [
  {
    value: "all",
    label: "Toda la serie",
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
    value: "2y",
    label: "2 años",
  },
];

export function SeasonalityFilter({
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