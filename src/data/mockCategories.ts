import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    title: "Фільми",
    slug: "movies",
    genres: [
      { id: "g-1", name: "Наукова фантастика", slug: "sci-fi" },
      { id: "g-2", name: "Трилер", slug: "thriller" },
      { id: "g-3", name: "Комедія", slug: "comedy" },
    ],
  },
  {
    id: "2",
    title: "Серіали",
    slug: "series",
    genres: [
      { id: "g-4", name: "Детектив", slug: "detective" },
      { id: "g-5", name: "Фентезі", slug: "fantasy" },
    ],
  },
  {
    id: "3",
    title: "Мультфільми",
    slug: "series",
    genres: [
      { id: "g-6", name: "Казка", slug: "fairy-tale" },
      { id: "g-7", name: "Мюзикл", slug: "fantasy" },
    ],
  },
  {
    id: "4",
    title: "Аніме",
    slug: "anime",
    genres: [
      { id: "g-8", name: "Драма", slug: "drama" },
      { id: "g-9", name: "Сейнен", slug: "seinen" },
    ],
  },
];
