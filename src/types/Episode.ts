import { Stream } from "./Stream";

export interface Episode {
  id: string; // uuid
  episodeNumber: number;
  title: string;
  duration: number;
  thumbnailURL: string;
  seasonId: string;
  streams: Stream[];
}
