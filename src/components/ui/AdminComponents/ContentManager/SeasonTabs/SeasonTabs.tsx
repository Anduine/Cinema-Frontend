import { Season } from "@/types";
import styles from "./SeasonTabs.module.css";
import EditButton from "@/components/ui/ButtonEdit/EditButton";
import DeleteButton from "@/components/ui/ButtonDelete/DeleteButton";

interface Props {
  seasons: Season[];
  activeSeasonId: string | null;
  onChange: (seasonId: string) => void;
  onAddClick: () => void;
  onEditClick: (id: string, currentNumber: number) => void;
  onDeleteClick: (id: string) => void;
}

function SeasonTabs({ seasons, activeSeasonId, onChange, onAddClick, onEditClick, onDeleteClick }: Props) {
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    const seasonNumber = seasons.find((season) => season.id === id)?.seasonNumber || 1;
    onEditClick(id, seasonNumber);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    onDeleteClick(id);
  };

  return (
    <div>
      <h2 className={styles.caption}>Сезони</h2>
      <div className={styles.tabs}>
        {seasons.map((season) => {
          const isActive = activeSeasonId === season.id;
          return (
            <button
              key={season.id}
              className={`${styles.seasonBtn} ${isActive ? styles.btnPrimary : ""}`}
              onClick={() => onChange(season.id)}
            >
              Сезон {season.seasonNumber}
            </button>
          );
        })}

        <button className={styles.seasonBtn} onClick={onAddClick}>
          + Додати сезон
        </button>
      </div>
      <div className={styles.actions}>
        <EditButton disabled={!activeSeasonId} onClick={(e) => handleEdit(e, activeSeasonId || "")} />
        <DeleteButton disabled={!activeSeasonId} onClick={(e) => handleDelete(e, activeSeasonId || "")} />
      </div>
    </div>
  );
}
export default SeasonTabs;
