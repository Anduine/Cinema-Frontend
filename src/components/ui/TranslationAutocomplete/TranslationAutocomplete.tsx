"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Translation } from "@/types/Translation";
import styles from "./TranslationAutocomplete.module.css";

interface Props {
  availableTranslations: Translation[];
  selectedId: number | null;
  onChange: (id: number | null) => void;
  placeholder?: string;
}

export const TranslationAutocomplete = ({ availableTranslations, selectedId, onChange, placeholder }: Props) => {
  const initialName = availableTranslations.find((t) => t.id === selectedId)?.name || "";

  const [inputValue, setInputValue] = useState<string>(initialName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTranslations = availableTranslations.filter((t) => t.name.toLowerCase().includes(inputValue.toLowerCase()));

  const handleSelect = (translation: Translation) => {
    onChange(translation.id);
    setInputValue(translation.name);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Tab" || e.key === "Enter") && isDropdownOpen && filteredTranslations.length > 0) {
      e.preventDefault();
      handleSelect(filteredTranslations[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
    if (selectedId !== null) {
      onChange(null);
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
        placeholder={placeholder || "Почніть вводити назву студії..."}
        required={selectedId === null}
      />

      {isDropdownOpen &&
        (filteredTranslations.length > 0 ? (
          <ul className={styles.dropdown}>
            {filteredTranslations.map((t) => (
              <li
                key={t.id}
                className={styles.dropdownItem}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(t);
                }}
              >
                {t.name} <span className={styles.language}>({t.language})</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noResults}>Озвучки не знайдені</div>
        ))}
    </div>
  );
};
