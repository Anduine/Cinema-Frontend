import EditMediaPage from "./EditMediaPage";

export function generateMetadata() {
  return {
    title: "Медіа - редагування",
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

function AdminEditMediaPage({ params }: Props) {
  return <EditMediaPage params={params} />;
}
export default AdminEditMediaPage;
