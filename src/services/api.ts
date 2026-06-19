import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // спроба повторити цей запит
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        console.log("Отримано 401. Робимо refresh токенів...");
        await axios.post(
          "/v1/auth/refresh",
          {},
          {
            baseURL: "/api",
            withCredentials: true,
          },
        );

        console.log("Токени успішно оновлено. Повторюємо оригінальний запит.");
        return api.request(originalRequest);
      } catch (refreshError) {
        console.log("Refresh токен також недійсний. Юзер розлогінений.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
