type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label?: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export function IndicatorFilter<T extends string>({
  label = "Indicador",
  value,
  options,
  onChange,
}: Props<T>) {
  return (
    <div className="filter-group">
      <label className="filter-label">
        {label}
      </label>

      <select
        className="filter-select"
        value={value}
        onChange={(e) =>
          onChange(e.target.value as T)
        }
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}