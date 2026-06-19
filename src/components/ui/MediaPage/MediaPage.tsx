import { MediaDetail } from "@/types/MediaDetail";
import MediaHeader from "../MediaHeader/MediaHeader";
import MediaGrid from "../MediaGrid/MediaGrid";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import CommentsSection from "../Comments/CommentsSection";
import styles from "./MediaPage.module.css";

interface Props {
  media: MediaDetail;
}

const MediaPage = async ({ media }: Props) => {
  return (
    <div className={styles.page}>
      <MediaHeader media={media} />
      <div className={styles.playerWrapper}>
        <VideoPlayer mediaTree={media.mediaTree} />
      </div>
      {media.relatedMedia && media.relatedMedia.length > 0 && (
        <>
          <h2>Зв'язані картини:</h2>
          <MediaGrid items={media.relatedMedia} />
        </>
      )}

      <CommentsSection mediaId={media.id} />
    </div>
  );
};
export { MediaPage };
