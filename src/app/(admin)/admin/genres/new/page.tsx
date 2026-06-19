import NewGenrePage from "./NewGenrePage";

export async function generateMetadata() {
  return {
    title: "Жанри - створення нового",
  };
}

function AdminNewGenrePage() {
  return <NewGenrePage />;
}
export default AdminNewGenrePage;
