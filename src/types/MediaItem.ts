export interface MediaItem {
  id: string; // uuid
  categoryName: string;
  title: string;
  slug: string;
  releaseYear: number;
  rating: number;
  status: string;
  posterURL: string;
  genres: string[];
}
