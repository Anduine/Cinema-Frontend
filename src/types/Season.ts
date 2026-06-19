import { Episode } from "./Episode";

export interface Season {
  id: string; // uuid
  seasonNumber: number;
  title: string;
  mediaId: string;
  episodes: Episode[];
}
