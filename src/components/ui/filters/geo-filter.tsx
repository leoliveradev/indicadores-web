type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;

  allLabel?: string;
  allValue?: string;
};

export function GeoFilter({
  label,
  value,
  options,
  onChange,
  allLabel = "Argentina",
  allValue = "Argentina",
}: Props) {
  return (
    <div className="mb-4">
      <label className="filter-label">
        {label}
      </label>

      <select
        className="filter-select"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        <option value={allValue}>
          {allLabel}
        </option>

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