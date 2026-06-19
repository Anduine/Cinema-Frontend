import GenresPage from "./GenresPage";

export async function generateMetadata() {
  return {
    title: "Жанри - таблиця",
  };
}

function AdminGenresPage() {
  return <GenresPage />;
}
export default AdminGenresPage;
