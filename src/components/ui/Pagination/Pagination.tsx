"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Навігація по сторінках">
      {hasPrev ? (
        <Link href={createPageURL(currentPage - 1)} className={styles.controlBtn}>
          Назад
        </Link>
      ) : (
        <span className={`${styles.controlBtn} ${styles.disabled}`}>Назад</span>
      )}

      <span className={styles.info}>
        Сторінка <span className={styles.highlight}>{currentPage}</span> / {totalPages}
      </span>

      {hasNext ? (
        <Link href={createPageURL(currentPage + 1)} className={styles.controlBtn}>
          Вперед
        </Link>
      ) : (
        <span className={`${styles.controlBtn} ${styles.disabled}`}>Вперед</span>
      )}
    </nav>
  );
}
export default Pagination;
