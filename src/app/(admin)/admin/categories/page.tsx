import CategoriesPage from "./CategoriesPage";

export async function generateMetadata() {
  return {
    title: "Категорії - таблиця",
  };
}

function AdminCategoriesPage() {
  return <CategoriesPage />;
}

export default AdminCategoriesPage;
