import { cookies } from "next/headers";
import { UserProfileResponse } from "@/types/responses";

export async function getMyProfileServer(): Promise<UserProfileResponse | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    const res = await fetch(`${apiUrl}/v1/interaction/profile/`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data: UserProfileResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Помилка серверного запиту профілю:", error);
    return null;
  }
}
