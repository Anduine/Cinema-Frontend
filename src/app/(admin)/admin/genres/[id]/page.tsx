import EditGenrePage from "./EditGenrePage";

export async function generateMetadata() {
  return {
    title: "Жанри - редагування",
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

function AdminEditGenrePage({ params }: Props) {
  return <EditGenrePage params={params} />;
}

export default AdminEditGenrePage;
