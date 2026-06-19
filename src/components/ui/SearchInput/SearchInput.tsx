"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./SearchInput.module.css";

function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("q", query.trim());
      params.set("page", "1");
    } else {
      params.delete("q");
    }

    if (pathname === "/movies" || pathname === "/series" || pathname === "/anime" || pathname === "/cartoons") {
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push(`/catalog?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");

    if (pathname === "/" || pathname.includes("/profile")) {
      router.push("/catalog");
    } else {
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <button type="submit" className={styles.searchBtn} title="Шукати">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук фільмів, серіалів..."
          className={styles.input}
        />

        {query && (
          <button type="button" onClick={handleClear} className={styles.clearBtn} title="Очистити">
            &times;
          </button>
        )}
      </div>
    </form>
  );
}
export default SearchInput;
