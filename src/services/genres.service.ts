import api from "./api";
import { Genre } from "@/types/Genre";
import { GenreRespone, GenresDictRespone, GenresResponse } from "@/types/responses";

export async function getAllGenres(): Promise<GenresResponse | null> {
  try {
    const response = await api.get<GenresResponse>("/v1/media/genres");
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні всіх жанрів:", err);
    return null;
  }
}

export async function getGenresByCategory(categorySlug: string): Promise<GenresResponse | null> {
  try {
    const response = await api.get<GenresResponse>(`/v1/media/categories/${categorySlug}/genres`);
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні жанрів:", err);
    return null;
  }
}

export async function getGenresDictionary(): Promise<GenresDictRespone | null> {
  try {
    const response = await api.get<GenresDictRespone>("/v1/media/genres/dictionary");
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні словника жанрів:", err);
    return null;
  }
}

export async function getGenreById(id: number): Promise<GenreRespone | null> {
  try {
    const response = await api.get(`/v1/media/genres/id/${id}`);
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні жанру по id:", err);
    return null;
  }
}

export async function createGenre(data: Partial<Genre>): Promise<boolean> {
  try {
    await api.post("/v1/media/admin/genres", data);
    return true;
  } catch (err) {
    console.error("Помилка при створені жанру:", err);
    return false;
  }
}

export async function updateGenre(id: number, data: Partial<Genre>): Promise<boolean> {
  try {
    await api.put(`/v1/media/admin/genres/${id}`, data);
    return true;
  } catch (err) {
    console.error(`Помилка при оновленні жанру (${id}):`, err);
    return false;
  }
}

export async function deleteGenre(id: number): Promise<boolean> {
  try {
    await api.delete(`/v1/media/admin/genres/${id}`);
    return true;
  } catch (err) {
    console.error(`Помилка при видаленні жанру (${id}):`, err);
    return false;
  }
}
