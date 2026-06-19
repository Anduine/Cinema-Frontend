import MediaPage from "./MediaPage";

export async function generateMetadata() {
  return {
    title: "Медіа - таблиця",
  };
}

function AdminMediaPage() {
  return <MediaPage />;
}
export default AdminMediaPage;
