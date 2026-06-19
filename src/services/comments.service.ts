import api from "./api";
import { CreateCommentResponse } from "@/types/responses";
import { Comment, PaginatedComments } from "@/types";

export async function getComments(mediaId: string, page = 1, limit = 20): Promise<PaginatedComments | null> {
  try {
    const res = await api.get<PaginatedComments>(`/v1/interaction/media/${mediaId}/comments`, {
      params: { page, limit },
    });
    return res.data;
  } catch (err) {
    console.error("Помилка завантаження коментарів:", err);
    return null;
  }
}

export async function createComment(mediaId: string, content: string): Promise<CreateCommentResponse | null> {
  try {
    const res = await api.post<CreateCommentResponse>(`/v1/interaction/comments`, { mediaId, content });
    return res.data;
  } catch (err) {
    console.error("Помилка створення коментаря:", err);
    return null;
  }
}

export async function replyToComment(commentId: string, content: string): Promise<CreateCommentResponse | null> {
  try {
    const res = await api.post<CreateCommentResponse>(`/v1/interaction/comments/${commentId}/replies`, { content });
    return res.data;
  } catch (err) {
    console.error("Помилка відповіді на коментар:", err);
    return null;
  }
}

export async function updateComment(commentId: string, content: string): Promise<boolean> {
  try {
    await api.put(`/v1/interaction/comments/${commentId}`, { content });
    return true;
  } catch (err) {
    console.error("Помилка оновлення коментаря:", err);
    return false;
  }
}

export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    await api.delete(`/v1/interaction/comments/${commentId}`);
    return true;
  } catch (err) {
    console.error("Помилка видалення коментаря:", err);
    return false;
  }
}
