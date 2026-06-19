import api from "./api";
import { UpdateProfileInput } from "@/types/requests/UpdateProfileInput";
import { MediaListResponse, UserProfileResponse } from "@/types/responses";

export async function getUserProfile(username: string): Promise<UserProfileResponse | null> {
  try {
    const res = await api.get(`/v1/users/${username}/profile`);
    return res.data;
  } catch (err) {
    console.error("Помилка при отриманні профілю:", err);
    return null;
  }
}

export async function updateProfile(data: UpdateProfileInput): Promise<boolean> {
  try {
    await api.put("/v1/interaction/profile/", data);
    return true;
  } catch (err) {
    console.error("Помилка оновлення профілю:", err);
    return false;
  }
}

export async function uploadAvatar(file: File): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.put<{ data: string }>("/v1/interaction/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.error("Помилка завантаження аватара:", err);
    return false;
  }
}
