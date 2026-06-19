interface WatchProgressRequest {
  mediaId: string;
  seasonId: string;
  episodeId: string;
  translationId: number;
  progressSeconds: number;
  isCompleted: boolean;
}
