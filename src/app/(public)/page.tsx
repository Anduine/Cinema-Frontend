import { getMediaList } from "@/services/media.service";
import PreviewMediaList from "@/components/ui/PreviewMediaList/PreviewMediaList";
import HeroBanner from "@/components/ui/HeroBanner/HeroBanner";
import styles from "./page.module.css";

export const metadata = {
  title: "Дивіться фільми та серіали онлайн",
  description: "Найкращий онлайн кінотеатр",
};

async function HomePage() {
  const [featuredResp, newReleasesResp, popularResp, animeResp] = await Promise.all([
    getMediaList({ limit: 1, sort: "rating" }),
    getMediaList({ limit: 6, sort: "newest" }),
    getMediaList({ limit: 6, sort: "views_desc" }),
    getMediaList({ limit: 6, category: "anime", sort: "rating" }),
  ]);

  const featuredMedia = featuredResp?.data?.[0];

  return (
    <div className={styles.container}>
      {featuredMedia && <HeroBanner mediaId={featuredMedia.id} />}

      <div className={styles.sectionsWrapper}>
        <PreviewMediaList
          title="Новинки"
          linkHref="/catalog?sort=newest"
          items={newReleasesResp?.data || []}
          emptyMessage="Новинок поки немає."
          variant="default"
        />

        <PreviewMediaList
          title="Зараз популярно"
          linkHref="/catalog?sort=views_desc"
          items={popularResp?.data || []}
          emptyMessage="Список порожній."
          variant="default"
        />

        <PreviewMediaList
          title="Топ Аніме"
          linkHref="/catalog?genres=anime"
          items={animeResp?.data || []}
          emptyMessage="Аніме не знайдено."
          variant="default"
        />
      </div>
    </div>
  );
}
export default HomePage;
