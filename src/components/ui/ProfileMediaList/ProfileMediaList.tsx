"use client";

import { useEffect, useState } from "react";
import { listFetchers, ListType } from "@/services/lists.service";
import MediaGrid from "../MediaGrid/MediaGrid";
import styles from "./ProfileMediaList.module.css";
import CircleTimer from "../CircleTimer/CircleTimer";

interface Props {
  listType: ListType;
  emptyMessage?: string;
}

function ProfileMediaList({ listType, emptyMessage }: Props) {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    if (currentPage > totalPages || isLoading) return;

    setIsLoading(true);

    const fetcher = listFetchers[listType];
    const resp = await fetcher(currentPage, 20);

    if (resp && resp.data) {
      setItems((prevItems) => [...prevItems, ...resp.data]);
      setCurrentPage(resp.page);
      setTotalPages(resp.totalPages);
      setCurrentPage((prevPage) => prevPage + 1);
    }

    setIsLoading(false);
  };

  if (isLoading && items.length === 0)
    return (
      <div className={styles.loader}>
        Завантаження...
        <CircleTimer />
      </div>
    );

  return (
    <div className={styles.listContainer}>
      {items.length > 0 ? (
        <MediaGrid items={items} />
      ) : (
        <div className={styles.emptyText}>{emptyMessage || "У цьому розділі поки що нічого немає"}</div>
      )}

      {currentPage < totalPages && (
        <div className={styles.actionsWrapper}>
          <button onClick={loadContent} disabled={isLoading} className={styles.loadMoreBtn}>
            {isLoading ? "Завантаження..." : "Показати ще"}
          </button>
          {isLoading && <CircleTimer />}
        </div>
      )}
    </div>
  );
}
export default ProfileMediaList;
