import api from "./api";
import { MediaInListsResponse, MediaListResponse } from "@/types/responses";

export type ListType = "favorites" | "watch-later" | "history";

export const listFetchers: Record<ListType, (page: number, limit: number) => Promise<MediaListResponse | null>> = {
  favorites: getFavorites,
  "watch-later": getWatchLater,
  history: getHistory,
};

export async function checkMediaInLists(mediaId: string): Promise<MediaInListsResponse | null> {
  try {
    const res = await api.get<MediaInListsResponse>(`/v1/interaction/lists/status/${mediaId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Помилка при отриманні статусу медіа у списках:", err);
    return null;
  }
}

export async function getWatchLater(page = 1, limit = 20): Promise<MediaListResponse | null> {
  try {
    const res = await api.get<MediaListResponse>(`/v1/interaction/lists/watch-later?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Помилка при отриманні списку watch later:", err);
    return null;
  }
}

export async function getFavorites(page = 1, limit = 20): Promise<MediaListResponse | null> {
  try {
    const res = await api.get<MediaListResponse>(`/v1/interaction/lists/favorites?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Помилка при отриманні списку favorites:", err);
    return null;
  }
}

export async function getHistory(page = 1, limit = 20): Promise<MediaListResponse | null> {
  try {
    const res = await api.get<MediaListResponse>(`/v1/interaction/history?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Помилка при отриманні списку favorites:", err);
    return null;
  }
}

export async function addToWatchLater(mediaId: string): Promise<boolean> {
  try {
    await api.post(
      `/v1/interaction/lists/watch-later`,
      { mediaId },
      {
        withCredentials: true,
      },
    );
    return true;
  } catch (err) {
    console.error("Помилка при додаванні медіа до watch later:", err);
    return false;
  }
}

export async function addToFavorites(mediaId: string): Promise<boolean> {
  try {
    await api.post(
      `/v1/interaction/lists/favorites`,
      { mediaId },
      {
        withCredentials: true,
      },
    );
    return true;
  } catch (err) {
    console.error("Помилка при додаванні медіа до favorites:", err);
    return false;
  }
}

export async function addToHistory(mediaId: string): Promise<boolean> {
  try {
    await api.post(
      `/v1/interaction/history`,
      { mediaId },
      {
        withCredentials: true,
      },
    );
    return true;
  } catch (err) {
    console.error("Помилка при додаванні медіа до history:", err);
    return false;
  }
}

export async function removeFromWatchLater(mediaId: string) {
  try {
    await api.delete(`/v1/interaction/lists/watch-later/${mediaId}`, { withCredentials: true });
    return true;
  } catch (err) {
    console.error("Помилка при видаленні медіа з watch later:", err);
    return false;
  }
}

export async function removeFromFavorites(mediaId: string) {
  try {
    await api.delete(`/v1/interaction/lists/favorites/${mediaId}`, { withCredentials: true });
    return true;
  } catch (err) {
    console.error("Помилка при видаленні медіа з favorites:", err);
    return false;
  }
}

export async function removeFromHistory(mediaId: string) {
  try {
    await api.delete(`/v1/interaction/history/${mediaId}`, { withCredentials: true });
    return true;
  } catch (err) {
    console.error("Помилка при видаленні медіа з history:", err);
    return false;
  }
}
