import React from 'react';

interface InputItem {
  name: string;
  value?: string;
  onValueChange: (value: string) => void;
  customClass?: string;
  error?: string;
}

export default function Input({
  name,
  value,
  onValueChange,
  customClass = '',
  error,
}: InputItem) {
  return (
    <div>
      <input
        name={name}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={`${customClass} ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <div className="message-error">{error}</div>}
    </div>
  );
}
