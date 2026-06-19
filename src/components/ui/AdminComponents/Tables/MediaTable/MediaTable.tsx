import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { MediaItem } from "@/types/MediaItem";
import stylesTable from "../Table.module.css";
import styles from "./MediaTable.module.css";
import ImageWithFallback from "@/components/ui/ImageWithFallback/ImageWithFallback";

interface Props {
  mediaItems: MediaItem[];
  handleDelete: (id: string, title: string) => void;
}

const MediaTable = ({ mediaItems, handleDelete }: Props) => {
  if (mediaItems.length === 0) {
    return <div className={stylesTable.empty}>Медіа відсутні</div>;
  }

  return (
    <div className={stylesTable.tableWrapper}>
      <table className={stylesTable.table}>
        <thead>
          <tr>
            <th>Постер</th>
            <th>Назва / slug</th>
            <th>Рік</th>
            <th>Категорія</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {mediaItems.map((item) => (
            <tr key={item.id}>
              <td className={styles.posterCell}>
                <ImageWithFallback
                  src={item.posterURL}
                  alt={item.title}
                  width={100}
                  height={150}
                  nextImage={false}
                  className={styles.miniPoster}
                />
              </td>
              <td>
                <div className={styles.title}>
                  <span className={stylesTable.mainText}>{item.title}</span>
                  <span className={stylesTable.mutedText}>{item.slug}</span>
                </div>
              </td>
              <td>{item.releaseYear}</td>
              <td>
                <span className={styles.badge}>{item.categoryName || "Не вказано"}</span>
              </td>
              <td>
                <span className={`${styles.statusBadge} ${styles[item.status]}`}>{item.status}</span>
              </td>
              <td>
                <div className={stylesTable.actions}>
                  <Link href={PAGES.ADMIN.MEDIA_EDIT(item.id)} className={stylesTable.editBtn}>
                    Редагувати
                  </Link>
                  <button onClick={() => handleDelete(item.id, item.title)} className={stylesTable.deleteBtn}>
                    Видалити
                  </button>
                  <Link href={PAGES.ADMIN.CONTENT_MANAGER(item.id)} className={stylesTable.contentBtn}>
                    Контент
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MediaTable;
