import EditTranslationPage from "./EditTranslationPage";

export async function generateMetadata() {
  return {
    title: "Озвучки - редагування",
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

function AdminEditTranslationPage({ params }: Props) {
  return <EditTranslationPage params={params} />;
}
export default AdminEditTranslationPage;
