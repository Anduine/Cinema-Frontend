"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Category, Genre } from "@/types";
import styles from "./TagSelector.module.css";

interface Props {
  availableValues: Genre[] | Category[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  placeholder?: string;
  inputId?: string;
  isDisable?: boolean;
}

function TagSelector({ availableValues, selectedIds, onChange, placeholder, inputId, isDisable }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredValues = availableValues?.filter(
    (genre) => !selectedIds.includes(genre.id) && genre.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const selectedValues = availableValues?.filter((genre) => selectedIds.includes(genre.id));

  const handleAdd = (id: number) => {
    onChange([...selectedIds, id]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleRemove = (idToRemove: number) => {
    onChange(selectedIds.filter((id) => id !== idToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Tab" || e.key === "Enter") && inputValue) {
      e.preventDefault();
      if (filteredValues.length > 0) {
        handleAdd(filteredValues[0].id);
      }
    } else if (e.key === "Backspace" && !inputValue && selectedIds.length > 0) {
      handleRemove(selectedIds[selectedIds.length - 1]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.inputWrapper} ${isDropdownOpen ? styles.focused : ""}`} onClick={() => inputRef.current?.focus()}>
        {selectedValues?.map((genre) => (
          <span key={genre.id} className={styles.chip}>
            {genre.name}
            <button
              type="button"
              className={styles.chipRemoveBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(genre.id);
              }}
            >
              &times;
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          id={inputId}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
          placeholder={selectedValues?.length === 0 ? placeholder : ""}
          disabled={isDisable}
        />
      </div>

      <ul className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ""}`}>
        {filteredValues.map((genre) => (
          <li
            key={genre.id}
            className={styles.dropdownItem}
            onMouseDown={(e) => {
              e.preventDefault();
              handleAdd(genre.id);
            }}
          >
            {genre.name} <span className={styles.slugMuted}>({genre.slug})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TagSelector;
