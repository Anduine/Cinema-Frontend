import { getMediaList } from "@/services/media.service";
import { getGenresByCategory } from "@/services/genres.service";
import CatalogTemplate from "@/components/ui/CatalogTemplate/CatalogTemplate";

interface Params {
  page: string;
  genres: string;
  sort: string;
}

interface PageProps {
  searchParams: Promise<Params>;
}

export function generateMetadata() {
  return {
    title: "Аніме",
  };
}

async function AnimePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const curPage = parseInt(params.page) || 1;

  const media = await getMediaList({ category: "anime", genres: params.genres, sort: params.sort, page: curPage });

  const genres = await getGenresByCategory("anime");

  if (!media) {
    return <div>Помилка завантаження аніме</div>;
  }
  const maxPage = Math.ceil(media.totalItems / media.limit);

  return (
    <CatalogTemplate
      title="Аніме"
      initialData={media.data}
      availableGenres={genres.data}
      totalPages={maxPage}
      currentPage={curPage}
    />
  );
}
export default AnimePage;
