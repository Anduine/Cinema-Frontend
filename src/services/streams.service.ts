import api from "./api";

export async function getStreamById(id: string) {
  try {
    const response = await api.get(`/v1/media/admin/streams/${id}`);
    return response.data;
  } catch (err) {
    console.error("Помилка при отриманні стріму:", err);
    return null;
  }
}

export async function deleteStream(id: string) {
  try {
    const response = await api.delete(`/v1/media/admin/streams/${id}`);
    return response.data;
  } catch (err) {
    console.error("Помилка при видаленні стріму:", err);
    return null;
  }
}
