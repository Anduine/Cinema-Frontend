"use client";

import { useMemo } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import CustomSelect, { SelectOption } from "@/components/ui/CustomDropdown/CustomDropdown";
import styles from "./TopControls.module.css";

interface Props {
  title?: string;
}

function TopControls({ title }: Props) {
  const {
    mediaTree,
    currentSeasonNum,
    currentEpisodeNum,
    currentTranslationId,
    setSeason,
    setEpisode,
    setTranslation,
    setIsPlaying,
  } = usePlayerStore();

  const filteredSeasons = useMemo(() => {
    if (!mediaTree || !currentTranslationId) return [];

    return mediaTree.seasons
      .map((season) => {
        const availableEpisodes = season.episodes.filter((ep) =>
          ep.streams.some((stream) => stream.translationId === currentTranslationId),
        );
        return { ...season, episodes: availableEpisodes };
      })
      .filter((season) => season.episodes.length > 0);
  }, [mediaTree, currentTranslationId]);

  if (!mediaTree) {
    return null;
  }

  const activeSeason = filteredSeasons.find((s) => s.seasonNumber === currentSeasonNum);

  const translationOptions: SelectOption[] = (mediaTree.availableTranslations || []).map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const seasonOptions: SelectOption[] = filteredSeasons.map((s) => ({
    value: s.seasonNumber,
    label: `Сезон ${s.seasonNumber}`,
  }));

  const episodesOptions: SelectOption[] = (activeSeason?.episodes || []).map((e) => ({
    value: e.episodeNumber,
    label: `${e.title ? `${e.episodeNumber} - ${e.title}` : `Серія ${e.episodeNumber}`}`,
  }));

  const handleTranslationChange = (val: string | number) => {
    console.log("handleTranslationChange", val);
    setTranslation(Number(val));
    setIsPlaying(false);
  };

  const handleSeasonChange = (val: string | number) => {
    setSeason(Number(val));
    setIsPlaying(false);
  };

  const handleEpisodeChange = (val: string | number) => {
    setEpisode(currentSeasonNum, Number(val));
    setIsPlaying(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectContainer}>
        <CustomSelect
          value={currentTranslationId}
          onChange={handleTranslationChange}
          options={translationOptions}
          placeholder="Оберіть озвучку"
          disabled={translationOptions?.length === 0}
          disabledText="Озвучки недоступні"
        />

        <CustomSelect
          value={currentSeasonNum}
          onChange={handleSeasonChange}
          options={seasonOptions}
          placeholder="Оберіть сезон"
          disabled={seasonOptions?.length === 0}
          disabledText="Сезони недоступні"
        />

        <CustomSelect
          value={currentEpisodeNum}
          onChange={handleEpisodeChange}
          options={episodesOptions}
          placeholder="Оберіть серію"
          disabled={episodesOptions?.length === 0}
          disabledText="Серії недоступні"
        />
      </div>

      <div>
        <h2 className={styles.title}>{title || ""}</h2>
      </div>
    </div>
  );
}
export default TopControls;
