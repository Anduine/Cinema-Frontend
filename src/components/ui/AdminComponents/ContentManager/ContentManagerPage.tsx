"use client";

import { useState } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { deleteSeason } from "@/services/seasons.service";
import { MediaDetail } from "@/types";
import SeasonTabs from "./SeasonTabs/SeasonTabs";
import EpisodesTable from "./EpisodesTable/EpisodesTable";
import ModalWindow from "../../ModalWindow/ModalWindow";
import SeasonForm from "../Forms/SeasonForm/SeasonForm";
import styles from "./ContentManager.module.css";

interface Props {
  media: MediaDetail;
}

function ContentManagerPage({ media }: Props) {
  const { showNotify } = useNotifications();
  const [activeSeasonId, setActiveSeasonId] = useState<string | null>(null);
  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);
  const [isSeasonEditModalOpen, setIsSeasonEditModalOpen] = useState(false);

  const activeSeason = media.mediaTree.seasons.find((s) => s.id === activeSeasonId) || media.mediaTree.seasons[0];

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Ви впевнені, що хочете видалити сезон?`)) {
      return;
    }

    const success = await deleteSeason(media.id, id);
    if (success) {
      media.mediaTree.seasons = media.mediaTree.seasons.filter((item) => item.id !== id);
    } else {
      showNotify(`Помилка при видаленні сезону.`, "error");
    }
  };

  return (
    <div className={styles.contentManager}>
      <header>
        <h1>Управління контентом: {media.title}</h1>
      </header>

      <SeasonTabs
        seasons={media.mediaTree.seasons}
        activeSeasonId={activeSeason?.id}
        onChange={setActiveSeasonId}
        onAddClick={() => setIsSeasonModalOpen(true)}
        onEditClick={() => setIsSeasonEditModalOpen(true)}
        onDeleteClick={handleDelete}
      />

      {activeSeason ? (
        <EpisodesTable mediaId={media.id} season={activeSeason} />
      ) : (
        <div className={styles.noSeasons}>Немає сезонів. Додайте перший сезон.</div>
      )}

      {isSeasonModalOpen && (
        <ModalWindow headerText="Додати сезон" onClose={() => setIsSeasonModalOpen(false)}>
          <SeasonForm mediaId={media.id} onClose={() => setIsSeasonModalOpen(false)} />
        </ModalWindow>
      )}

      {isSeasonEditModalOpen && (
        <ModalWindow headerText="Редагувати сезон" onClose={() => setIsSeasonEditModalOpen(false)}>
          <SeasonForm mediaId={media.id} initialData={activeSeason} onClose={() => setIsSeasonEditModalOpen(false)} />
        </ModalWindow>
      )}
    </div>
  );
}
export default ContentManagerPage;
