import { create } from "zustand";
import { MediaTree } from "@/types";
import { Stream } from "@/types";

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;

  mediaTree: MediaTree | null;
  currentSeasonNum: number;
  currentEpisodeNum: number;
  currentTranslationId: number | null;

  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;

  initMedia: (tree: MediaTree, initialSeason?: number, initialEpisode?: number, initialTranslationId?: number) => void;
  setTranslation: (id: number) => void;
  setSeason: (seasonNum: number) => void;
  setEpisode: (seasonNum: number, episodeNum: number) => void;

  getActiveStream: () => Stream | null;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isFullscreen: false,

  mediaTree: null,
  currentSeasonNum: 1,
  currentEpisodeNum: 1,
  currentTranslationId: null,

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),

  initMedia: (tree, initialSeason = 1, initialEpisode = 1, initialTranslationId?: number) => {
    const defaultTranslationId = tree.availableTranslations?.length > 0 ? tree.availableTranslations[0].id : null;

    set({
      mediaTree: tree,
      currentSeasonNum: initialSeason,
      currentEpisodeNum: initialEpisode,
      currentTranslationId: initialTranslationId || defaultTranslationId,
    });
  },

  setTranslation: (id) => set({ currentTranslationId: id }),

  setSeason: (seasonNum) => set({ currentSeasonNum: seasonNum }),

  setEpisode: (seasonNum, episodeNum) =>
    set({
      currentSeasonNum: seasonNum,
      currentEpisodeNum: episodeNum,
      // isPlaying: true,
    }),

  getActiveStream: () => {
    const { mediaTree, currentSeasonNum, currentEpisodeNum, currentTranslationId } = get();
    if (!mediaTree || !currentTranslationId) return null;

    const season = mediaTree.seasons.find((s) => s.seasonNumber === currentSeasonNum);
    if (!season) {
      console.debug("Для перемикання відео сезон ", currentSeasonNum, " не знайдено");
      return null;
    }

    const episode = season.episodes.find((e) => e.episodeNumber === currentEpisodeNum);
    if (!episode) {
      console.debug("Для перемикання відео серія ", currentEpisodeNum, " не знайдена");
      return null;
    }

    const stream = episode.streams.find((st) => st.translationId === currentTranslationId);
    if (!stream) {
      console.debug("Для перемикання відео озвучка ", currentTranslationId, " не знайдена");
      return null;
    }
    return stream;
  },
}));
