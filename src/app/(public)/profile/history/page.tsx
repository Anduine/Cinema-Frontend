import ProfileMediaList from "@/components/ui/ProfileMediaList/ProfileMediaList";

export function generateMetadata() {
  return {
    title: "Історія перегляду",
  };
}

function WatchLaterPage() {
  return (
    <>
      <h1>Історія перегляду</h1>
      <ProfileMediaList listType="history" />
    </>
  );
}
export default WatchLaterPage;
