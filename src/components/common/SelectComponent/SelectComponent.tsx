import { useState, ChangeEvent } from 'react';

interface Option {
  id: number | string;
  value: string;
  label: string;
}

interface SelectComponentProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  setSelectedOption?: (value: string) => void;
  selectedOption?: string;
  labelId: string; // for accessibility
}

export default function SelectComponent({
  options,
  placeholder,
  onChange,
  setSelectedOption,
  selectedOption,
  labelId,
}: SelectComponentProps) {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (setSelectedOption) {
      setSelectedOption(value);
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <label htmlFor={labelId} className="sr-only">
        {placeholder}
      </label>
      <select
        id={labelId}
        name="choisir"
        value={selectedOption}
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(option => (
          <option
            key={option.id}
            value={option.value}
            className="cursor-pointer"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
