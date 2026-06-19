import TranslationsPage from "./TranslationsPage";

export async function generateMetadata() {
  return {
    title: "Озвучки - таблиця",
  };
}

function AdminTranslationsPage() {
  return <TranslationsPage />;
}
export default AdminTranslationsPage;
