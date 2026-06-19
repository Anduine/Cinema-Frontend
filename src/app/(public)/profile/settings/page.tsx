import { redirect } from "next/navigation";
import { getMyProfileServer } from "@/services/server.user";
import ProfileEditForm from "@/components/ui/ProfileEditForm/ProfileEditForm";

export const metadata = {
  title: "Редагування профілю - CinemaApp",
};

async function SettingsPage() {
  const profileResp = await getMyProfileServer();

  if (!profileResp) {
    redirect("/login");
  }

  return <ProfileEditForm initialProfile={profileResp.data} />;
}
export default SettingsPage;
