import Link from "next/link";
import { getAvatarURL } from "@/config/avatar.config";
import { UserProfile } from "@/types";
import ProfileLists from "../ProfileLists/ProfileLists";
import styles from "./ProfileView.module.css";

interface Props {
  profile: UserProfile;
  isPersonal: boolean;
}

function ProfileView({ profile, isPersonal }: Props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatarContainer}>
          {profile.avatarURL ? (
            <img src={getAvatarURL(profile.avatarURL)} alt="Мій аватар" className={styles.avatar} />
          ) : (
            <div className={styles.avatarPlaceholder}>{profile.username}</div>
          )}
        </div>

        <div className={styles.infoContainer}>
          <h1 className={styles.username}>{profile.username}</h1>

          <div className={styles.privateInfo}>
            {profile.email && (
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
            )}
            {(profile.firstname || profile.lastname) && (
              <p>
                <strong>Ім'я:</strong> {profile.firstname} {profile.lastname}
              </p>
            )}
          </div>

          {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

          <Link href="/profile/settings" className={styles.editBtn}>
            Редагувати профіль
          </Link>
        </div>
      </header>

      <ProfileLists isPersonal={isPersonal} />
    </div>
  );
}
export default ProfileView;
