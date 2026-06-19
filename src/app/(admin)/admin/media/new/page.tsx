import NewMediaPage from "./NewMediaPage";

export async function generateMetadata() {
  return {
    title: "Медіа - створення нового",
  };
}

function AdminNewMediaPage() {
  return <NewMediaPage />;
}
export default AdminNewMediaPage;
