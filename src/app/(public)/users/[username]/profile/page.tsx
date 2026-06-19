import { getUserProfile } from "@/services/profile.service";
import ProfileView from "@/components/ui/ProfileView/ProfileView";

interface Props {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: Props) {
  if (!params.username) {
    return {
      title: "Невідомий профіль",
    };
  }

  return {
    title: `Профіль ${params.username}`,
  };
}

async function PublicProfile({ params }: Props) {
  const profileResp = await getUserProfile(params.username);

  if (!profileResp) {
    return <div className="information-block">Не вдалося завантажити профіль</div>;
    // redirect("/login");
  }

  return <ProfileView isPersonal={true} profile={profileResp.data} />;
}
export default PublicProfile;
