import api from "./api";
import { MediaDetail } from "@/types";
import { RequestMediaParams } from "@/types/requests";
import { MediaListResponse, MediaDetailResponse, MediaTreeResponse } from "@/types/responses";

export async function getMediaList(params: RequestMediaParams): Promise<MediaListResponse | null> {
  try {
    const response = await api.get<MediaListResponse>(`/v1/media/`, {
      params: params,
    });
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні списку медіа:", err);
    return null;
  }
}

export async function getMediaDetailBySlug(slug: string): Promise<MediaDetailResponse | null> {
  try {
    const response = await api.get<MediaDetailResponse>(`/v1/media/slug/${slug}`);
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні медіа:", err);
    return null;
  }
}

export async function getMediaDetailById(id: string): Promise<MediaDetailResponse | null> {
  try {
    const response = await api.get<MediaDetailResponse>(`/v1/media/id/${id}`);
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні медіа:", err);
    return null;
  }
}

export async function getMediaTree(id: string): Promise<MediaTreeResponse | null> {
  try {
    const response = await api.get<MediaTreeResponse>(`/v1/media/id/${id}/tree`);
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні медіа:", err);
    return null;
  }
}

export async function createMedia(data: Partial<MediaDetail>): Promise<boolean> {
  try {
    await api.post(`/v1/media/admin/media/`, data);
    return true;
  } catch (err) {
    console.error(`Помилка при оновленні медіа (${data.id}):`, err);
    return false;
  }
}

export async function updateMedia(id: string, data: Partial<MediaDetail>): Promise<boolean> {
  try {
    await api.put(`/v1/media/admin/media/${id}`, data);
    return true;
  } catch (err) {
    console.error(`Помилка при оновленні медіа (${id}):`, err);
    return false;
  }
}

export async function deleteMedia(id: string): Promise<boolean> {
  try {
    await api.delete(`/v1/media/admin/media/${id}`);
    return true;
  } catch (err) {
    console.error(`Помилка при видаленні медіа (${id}):`, err);
    return false;
  }
}
