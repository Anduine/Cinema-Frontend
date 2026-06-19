"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdown.module.css";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface Props {
  value: string | number | null;
  onChange: (value: string | number) => void;
  options?: SelectOption[]; // значення списку
  placeholder?: string;
  disabled?: boolean;
  disabledText?: string;
  className?: string;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Оберіть значення...",
  disabled = false,
  disabledText = "Недоступно",
  className = "",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (disabled) return disabledText;
    if (value === null || value === "") return placeholder;

    if (options) {
      const selected = options.find((opt) => opt.value === value);
      if (selected) return selected.label;
    }

    return placeholder;
  };

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      <div
        className={`${styles.trigger} ${isOpen ? styles.open : ""} ${disabled ? styles.disabled : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{getDisplayValue()}</span>
        <svg className={styles.arrow} viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
        {options &&
          options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.option} ${value === opt.value ? styles.selected : ""}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
      </div>
    </div>
  );
}
export default CustomSelect;
