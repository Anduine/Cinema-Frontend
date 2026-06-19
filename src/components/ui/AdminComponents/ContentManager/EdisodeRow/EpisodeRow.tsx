"use client";

import { useEffect, useState } from "react";
import { Episode, Translation } from "@/types";
import { getAllTranslations } from "@/services/translations.service";
import StreamsList from "../StreamsList/StreamsList";
import EditButton from "@/components/ui/ButtonEdit/EditButton";
import DeleteButton from "@/components/ui/ButtonDelete/DeleteButton";
import stylesTable from "../Table.module.css";
import styles from "./EpisodeRow.module.css";

interface Props {
  mediaId: string;
  seasonNumber: number;
  seasonId: string;
  episode: Episode;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (episode: Episode) => void;
  onDelete: (episodeId: string) => void;
}

function EpisodeRow({ mediaId, seasonNumber, seasonId, episode, isExpanded, onToggle, onEdit, onDelete }: Props) {
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    loadDeps();
  }, []);

  const loadDeps = async () => {
    const response = await getAllTranslations();
    setTranslations(response.data);
  };

  const len = episode.streams.length;
  const transText = len === 0 ? "озвучок" : len === 1 ? "озвучка" : len > 5 ? "озвучок" : "озвучки";

  return (
    <>
      <tr>
        <td>{episode.episodeNumber}</td>
        <td>{episode.title || "Без назви"}</td>
        <td>
          <span>
            {episode.streams.length} {transText}
          </span>
        </td>
        <td className={stylesTable.actions}>
          <button className={styles.expandBtn} onClick={onToggle}>
            {isExpanded ? "Сховати відео потоки" : "Показати відео потоки"}
          </button>
          <EditButton
            onClick={() => {
              onEdit(episode);
            }}
          />
          <DeleteButton
            onClick={() => {
              onDelete(episode.id);
            }}
          />
        </td>
      </tr>

      {isExpanded && (
        <tr className={stylesTable.nonActiveRow}>
          <td colSpan={4}>
            <div className={styles.streamsPanel}>
              <div className={styles.panelHeader}>
                <h3>Завантажені відео потоки з озвучками</h3>
              </div>

              <StreamsList
                streams={episode.streams}
                mediaId={mediaId}
                seasonNumber={seasonNumber}
                seasonId={seasonId}
                episodeNumber={episode.episodeNumber}
                episodeId={episode.id}
                availableTranslations={translations}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
export default EpisodeRow;
