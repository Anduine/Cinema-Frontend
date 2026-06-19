import { getMyProfileServer } from "@/services/server.user";
import ProfileView from "@/components/ui/ProfileView/ProfileView";

export async function generateMetadata() {
  return {
    title: "Мій профіль",
  };
}

async function PersonalProfile() {
  const profileResp = await getMyProfileServer();

  if (!profileResp) {
    return <div className="information-block">Не вдалося завантажити профіль</div>;
    // redirect("/login");
  }

  return <ProfileView isPersonal={true} profile={profileResp.data} />;
}
export default PersonalProfile;
