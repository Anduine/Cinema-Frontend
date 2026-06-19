import axios from "axios";
import api from "./api";
import { UploadVideoURLResponse } from "@/types/responses";

export async function getUploadURL(meta: any): Promise<UploadVideoURLResponse> | null {
  try {
    const response = await api.post<UploadVideoURLResponse>(`/v1/media/admin/video/upload-url`, meta);
    return response.data;
  } catch (err) {
    console.error(`Помилка при отриманні URL завантаження відео:`, err);
    return null;
  }
}

export async function uploadVideoToStorage(
  uploadURL: string,
  videoFile: File,
  handleProgress: (progress: any) => void,
): Promise<string | null> {
  try {
    const response = await axios.put<string>(uploadURL, videoFile, {
      timeout: 0,
      headers: {
        "Content-Type": videoFile.type || "video/mp4",
      },
      onUploadProgress: handleProgress,
    });
    return response.data;
  } catch (err) {
    console.error(`Помилка при завантаженні відео:`, err);
    return null;
  }
}

export async function uploadComplete(meta: any) {
  try {
    const response = await api.post(`/v1/media/admin/video/upload-complete`, meta);
    return response.data;
  } catch (err) {
    console.error(`Помилка при завантаженні відео:`, err);
    return null;
  }
}

export async function uploadVideo(formData: FormData) {
  try {
    await api.post(`/v1/media/admin/video/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.error(`Помилка при завантаженні відео:`, err);
    return false;
  }
}
