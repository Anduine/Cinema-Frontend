import { Category } from "@/types";
import styles from "../Table.module.css";

interface Props {
  categories: Category[];
}

const CategoriesTable = ({ categories }: Props) => {
  if (categories.length === 0) {
    return <div className={styles.empty}>Категорії відсутні</div>;
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
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td className={styles.mainText}>{category.name}</td>
              <td className={styles.mutedText}>{category.slug}</td>
              <td className={styles.actions}>Немає доступних дій</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategoriesTable;
