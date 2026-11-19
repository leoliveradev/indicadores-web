type Props = {
  label: string;
  value: string;
  options: string[];
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
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}