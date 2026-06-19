"use client";

import { useRef, useEffect, useMemo } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { usePlayerShortcuts } from "@/hooks/usePlayerShortcuts";
import { useWatchProgress } from "@/hooks/useWatchProgress";
import { getStream } from "@/config/videoURLs.config";
import { MediaTree } from "@/types/MediaTree";
import HlsVideoCore from "./HlsVideoCore";
import PlayerOverlay from "./PlayerOverlay/PlayerOverlay";
import styles from "./VideoPlayer.module.css";

interface Props {
  mediaTree: MediaTree;
  mediaTitle?: string;
  initialSeason?: number;
  initialEpisode?: number;
}

function VideoPlayer({ mediaTree, mediaTitle, initialSeason, initialEpisode }: Props) {
  const { initMedia, getActiveStream, currentSeasonNum, currentEpisodeNum, currentTranslationId } = usePlayerStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleFullscreenToggle } = usePlayerShortcuts(videoRef, containerRef);

  useEffect(() => {
    console.log(
      "Initializing media with tree:",
      mediaTree,
      "\ninitialSeason:",
      initialSeason,
      "\ninitialEpisode:",
      initialEpisode,
    );

    initMedia(mediaTree, initialSeason, initialEpisode);
  }, [mediaTree, initialSeason, initialEpisode, initMedia]);

  const activeStream = getActiveStream();

  const isVideoReady = !!activeStream && activeStream.masterPlaylistURL !== "" && activeStream.status === "available";

  const { currentSeasonId, currentEpisodeId } = useMemo(() => {
    if (!mediaTree) return { currentSeasonId: undefined, currentEpisodeId: undefined };

    const season = mediaTree.seasons.find((s) => s.seasonNumber === currentSeasonNum);
    const episode = season?.episodes.find((e) => e.episodeNumber === currentEpisodeNum);

    return {
      currentSeasonId: season?.id,
      currentEpisodeId: episode?.id,
    };
  }, [mediaTree, currentSeasonNum, currentEpisodeNum]);

  useWatchProgress({
    videoRef,
    isVideoReady,
    mediaId: mediaTree.mediaId,
    seasonId: currentSeasonId,
    episodeId: currentEpisodeId,
    translationId: currentTranslationId,
    saveIntervalMs: 10000,
  });

  return (
    <div ref={containerRef} className={styles.playerContainer}>
      {!isVideoReady ? (
        <div className={styles.noVideoPlaceholder}>
          <p>Відео недоступне</p>
        </div>
      ) : (
        <HlsVideoCore src={getStream(activeStream.masterPlaylistURL)} videoRef={videoRef} />
      )}

      <PlayerOverlay
        videoRef={videoRef}
        isVideoReady={isVideoReady}
        onToggleFullscreen={handleFullscreenToggle}
        mediaTitle={mediaTitle || null}
      />
    </div>
  );
}
export default VideoPlayer;
