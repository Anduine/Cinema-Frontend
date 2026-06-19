export const PAGES = {
  MEDIA_PAGE: (slug: string) => `/m/${slug}`,
  MOVIES: "/movies",
  SERIES: "/series",
  ANIME: "/anime",
  CARTOONS: "/cartoons",

  LOGIN: "/login",
  REGISTER: "/register",

  USER_PROFILE: (username: string) => `/users/${username}/profile`,
  USER_FAVORITES: (username: string) => `/users/${username}/profile/favorites`,

  PROFILE: "/profile",
  HISTORY: "/profile/history",
  FAVORITES: "/profile/favorites",
  WATCH_LATER: "/profile/watch-later",

  ADMIN: {
    CATEGORIES: "/admin/categories",
    CATEGORIES_EDIT: (id: number) => `/admin/categories/${id}`,
    GENRES: "/admin/genres",
    GENRES_NEW: "/admin/genres/new",
    GENRES_EDIT: (id: number) => `/admin/genres/${id}`,
    MEDIA: "/admin/media",
    MEDIA_NEW: "/admin/media/new",
    MEDIA_EDIT: (id: string) => `/admin/media/${id}`,
    TRANSLATIONS: "/admin/translations",
    TRANSLATIONS_NEW: "/admin/translations/new",
    TRANSLATIONS_EDIT: (id: number) => `/admin/translations/${id}`,
    VIDEO_UPLOAD: "/admin/video/upload",

    CONTENT_MANAGER: (id: string) => `/admin/media/${id}/content`,
  },
};
