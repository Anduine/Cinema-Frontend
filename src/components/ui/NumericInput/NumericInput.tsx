"use client";

import { useState, useEffect } from "react";

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  value: string | number;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  autoComplete?: string;
  required?: boolean;
}

function NumericInput({ id, value, onChange, placeholder, className, min, max, ...props }: NumericInputProps) {
  const [inputValue, setInputValue] = useState<string>(value === 0 || value === undefined ? "" : value.toString());

  useEffect(() => {
    if (value === 0 && inputValue === "") return;
    setInputValue(value === 0 || value === undefined ? "" : value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (/^\d*$/.test(val)) {
      setInputValue(val);

      let numericValue = val === "" ? 0 : Number(val);

      if (max !== undefined && numericValue > max) return;

      onChange?.(e);
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      const fallbackValue = min !== undefined ? min : 0;
      setInputValue(fallbackValue === 0 ? "" : fallbackValue.toString());
    }
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}
export default NumericInput;
