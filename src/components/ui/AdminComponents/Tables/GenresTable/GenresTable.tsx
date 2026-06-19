import Link from "next/link";
import { Genre } from "@/types/Genre";
import { PAGES } from "@/config/pages.config";
import styles from "../Table.module.css";

interface Props {
  genres: Genre[];
  onDelete: (id: number, name: string) => void;
}

const GenresTable = ({ genres, onDelete }: Props) => {
  if (genres.length === 0) {
    return <div className={styles.empty}>Жанри відсутні</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва</th>
            <th>Slug</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td>{genre.id}</td>
              <td className={styles.mainText}>{genre.name}</td>
              <td className={styles.mutedText}>{genre.slug}</td>
              <td className={styles.actions}>
                <Link href={PAGES.ADMIN.GENRES_EDIT(genre.id)} className={styles.editBtn}>
                  Редагувати
                </Link>
                <button onClick={() => onDelete(genre.id, genre.name)} className={styles.deleteBtn}>
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default GenresTable;
