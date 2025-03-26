import React from 'react';

interface InputProps {
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customClass?: string;
  placeholder?: string;
  checked?: boolean;
  error?: string;
}

export default function Checkbox({
  name,
  value,
  onChange,
  customClass = '',
  placeholder = '',
  checked,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        name={name}
        value={value}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        placeholder={placeholder}
        className={`${customClass} cursor-pointer ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
