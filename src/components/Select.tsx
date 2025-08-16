import type { ChangeEvent } from "react";
import type { SelectProps } from "../interfaces/interfaces";

const Select = ({ label, onChange, csvHeaders, value }: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex w-full flex-col text-start  flex-1/12">
      <label className="mb-2 font-semibold" htmlFor={label}>
        {label}
      </label>
      <select
        className="bg-purple-800/50 border border-purple-500 rounded-lg px-2 py-2"
        name={label}
        id={label}
        onChange={handleChange}
        value={value}
      >
        {csvHeaders.map((header) => (
          <option className="bg-neutral-900 " key={header} value={header}>
            {header}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
