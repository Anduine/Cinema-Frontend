import { Category, Genre, MediaItem, Actor, MediaTree } from "./";

export interface MediaDetail {
  id: string;
  category: Category;
  title: string;
  slug: string;
  releaseYear: number;
  rating: number;
  status: string;
  ageRestriction: string;
  countries: string;
  duration: string;
  posterURL: string;
  genres: Genre[];
  createdAt: Date;
  updatedAt: Date;
  actors: Actor[];
  relatedMedia: MediaItem[];
  description: string;
  mediaTree: MediaTree;
}
