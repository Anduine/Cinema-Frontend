import { UserResponse } from "@/types/responses";
import api from "./api";

export async function login(formData: any): Promise<UserResponse | null> {
  try {
    const res = await api.post<UserResponse>("/v1/auth/login", formData);
    return res.data;
  } catch (err) {
    console.error("Помилка при логіні в акаунт:", err);
    return null;
  }
}

export async function logout(): Promise<boolean> {
  try {
    await api.post(
      "/v1/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    return true;
  } catch (err) {
    console.error("Помилка при виході з акаунту:", err);
    return false;
  }
}

export async function register(formData: any): Promise<UserResponse | null> {
  try {
    const res = await api.post<UserResponse>("/v1/auth/register", formData);
    return res.data;
  } catch (err) {
    console.error("Помилка при логіні в акаунт:", err);
    return null;
  }
}

export async function getMe(): Promise<UserResponse | null> {
  try {
    const res = await api.get<UserResponse>("/v1/auth/me", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Помилка при отримані даних про користувача:", err);
    return null;
  }
}

export async function refreshTokens(): Promise<boolean> {
  try {
    await api.get("/v1/auth/refresh", {
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.error("Помилка при оновлені токенів:", err);
    return false;
  }
}
