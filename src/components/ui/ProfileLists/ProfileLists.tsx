"use client";

import { useEffect, useState } from "react";
import { getFavorites, getWatchLater, getHistory } from "@/services/lists.service";
import { PAGES } from "@/config/pages.config";
import PreviewMediaList from "../PreviewMediaList/PreviewMediaList";
import CircleTimer from "../CircleTimer/CircleTimer";
import styles from "./ProfileLists.module.css";

interface Props {
  isPersonal: boolean;
}

function ProfileLists({ isPersonal }: Props) {
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDeps();
  }, []);

  const loadDeps = async () => {
    setIsLoading(true);

    if (isPersonal) {
      const [favResp, watchLaterResp, historyResp] = await Promise.all([
        getFavorites(1, 10),
        getWatchLater(1, 10),
        getHistory(1, 10),
      ]);

      setFavorites(favResp?.data);
      setWatchLater(watchLaterResp?.data);
      setHistory(historyResp?.data);
    } else {
      const watchLaterResp = await getWatchLater(1, 10);
      setWatchLater(watchLaterResp.data);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className={styles.loader}>
        <p>Завантаження списків...</p>
        <CircleTimer />
      </div>
    );

  return (
    <div className={styles.lists}>
      <PreviewMediaList
        title="Улюблені"
        linkHref={isPersonal ? "/profile/favorites" : "/favorites"}
        items={favorites}
        emptyMessage="Немає медіа в списку Улюблене"
      />
      {!!isPersonal && (
        <>
          <PreviewMediaList
            title="Дивитися потім"
            linkHref={PAGES.WATCH_LATER}
            items={watchLater}
            emptyMessage="Немає медіа в списку Дивитися потім"
          />
          <PreviewMediaList
            title="Історія"
            linkHref={PAGES.HISTORY}
            items={history}
            emptyMessage="Немає медіа в списку Історія"
          />
        </>
      )}
    </div>
  );
}
export default ProfileLists;
