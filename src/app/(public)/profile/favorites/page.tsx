import ProfileMediaList from "@/components/ui/ProfileMediaList/ProfileMediaList";

export function generateMetadata() {
  return {
    title: "Список улюблених",
  };
}

function FavoritesPage() {
  return (
    <>
      <h1>Список улюблених</h1>
      <ProfileMediaList listType="favorites" />
    </>
  );
}
export default FavoritesPage;
