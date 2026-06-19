import NewTranslationPage from "./NewTranslationPage";

export async function generateMetadata() {
  return {
    title: "Озвучки - створення нової",
  };
}

function AdminNewTranslationPage() {
  return <NewTranslationPage />;
}
export default AdminNewTranslationPage;
