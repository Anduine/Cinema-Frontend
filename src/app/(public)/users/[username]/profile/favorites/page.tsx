import ProfileMediaList from "@/components/ui/ProfileMediaList/ProfileMediaList";

export function generateMetadata() {
  return {
    title: "Список улюблених",
  };
}

function UserFavoritesPage() {
  return (
    <>
      <h1>Список улюблених</h1>
      <ProfileMediaList listType="watch-later" />
    </>
  );
}
export default UserFavoritesPage;
