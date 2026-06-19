"use client";

import { useState } from "react";
import { deleteEpisode } from "@/services/episodes.service";
import { Episode, Season } from "@/types";
import EpisodeRow from "../EdisodeRow/EpisodeRow";
import ModalWindow from "@/components/ui/ModalWindow/ModalWindow";
import EpisodeForm from "../../Forms/EpisodeForm/EdisodeForm";
import stylesTable from "../Table.module.css";
import styles from "./EpisodesTable.module.css";

interface Props {
  mediaId: string;
  season: Season;
}

function EpisodesTable({ mediaId, season }: Props) {
  const [expandedEpisodeId, setExpandedEpisodeId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<Episode | null>(null);

  const toggleRow = (epId: string) => {
    setExpandedEpisodeId((prev) => (prev === epId ? null : epId));
  };

  const handleEditEpisode = (episode: Episode) => {
    setIsEditModalOpen(episode);
  };

  const handleDeleteEpisode = async (episodeId: string) => {
    const ok = await deleteEpisode(mediaId, episodeId);
    if (ok) {
      season = { ...season, episodes: season.episodes.filter((ep) => ep.id !== episodeId) };
    }
  };

  return (
    <div className={stylesTable.tableWrapper}>
      <table className={stylesTable.table}>
        <thead>
          <tr>
            <th>Серія</th>
            <th>Назва</th>
            <th>Відеопотоки (Озвучки)</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr className={stylesTable.nonActiveRow}>
            <td colSpan={4}>
              <div className={stylesTable.actionsBarRow}>
                <button className={styles.addEpisode} onClick={() => setIsCreateModalOpen(true)}>
                  + Додати серію
                </button>
              </div>
            </td>
          </tr>
          {season.episodes.length > 0 ? (
            season.episodes.map((ep) => (
              <EpisodeRow
                key={ep.id}
                mediaId={mediaId}
                seasonNumber={season.seasonNumber}
                seasonId={season.id}
                episode={ep}
                isExpanded={expandedEpisodeId === ep.id}
                onToggle={() => toggleRow(ep.id)}
                onEdit={handleEditEpisode}
                onDelete={handleDeleteEpisode}
              />
            ))
          ) : (
            <tr className={stylesTable.nonActiveRow}>
              <td colSpan={4}>
                <div className={styles.noEpisodes}>Немає серій. Додайте першу серію.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <ModalWindow
          headerText="Додати серію"
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
        >
          <EpisodeForm
            mediaId={mediaId}
            seasonId={season.id}
            onClose={() => {
              setIsCreateModalOpen(false);
            }}
          />
        </ModalWindow>
      )}

      {isEditModalOpen && (
        <ModalWindow headerText="Редагувати серію" onClose={() => setIsEditModalOpen(null)}>
          <EpisodeForm
            mediaId={mediaId}
            seasonId={season.id}
            initialData={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(null);
            }}
          />
        </ModalWindow>
      )}
    </div>
  );
}
export default EpisodesTable;
