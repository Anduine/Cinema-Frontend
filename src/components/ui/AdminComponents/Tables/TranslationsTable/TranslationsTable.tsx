import { Translation } from "@/types";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import stylesTable from "../Table.module.css";

interface Props {
  translationItems: Translation[];
  handleDelete: (id: number) => void;
}

function TranslationsTable({ translationItems, handleDelete }: Props) {
  if (translationItems.length === 0) {
    return <div className={stylesTable.empty}>Озвучки відсутні</div>;
  }

  return (
    <div className={stylesTable.tableWrapper}>
      <table className={stylesTable.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва</th>
            <th>Мова</th>
            <th>Тип</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {translationItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <div>
                  <span className={stylesTable.mainText}>{item.name}</span>
                </div>
              </td>
              <td>{item.language}</td>
              <td>
                <span>{item.type || "Не вказано"}</span>
              </td>
              <td>
                <div className={stylesTable.actions}>
                  <Link href={PAGES.ADMIN.TRANSLATIONS_EDIT(item.id)} className={stylesTable.editBtn}>
                    Редагувати
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className={stylesTable.deleteBtn}>
                    Видалити
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TranslationsTable;
