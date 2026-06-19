import { getGenresByCategory } from "@/services/genres.service";
import { getMediaList } from "@/services/media.service";
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
    title: "Мультфільми",
  };
}

async function CartoonsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const curPage = parseInt(params.page) || 1;

  const media = await getMediaList({ category: "cartoons", genres: params.genres, sort: params.sort, page: curPage });

  const genres = await getGenresByCategory("cartoons");

  if (!media) {
    return <div>Помилка завантаження мультфільмів</div>;
  }
  const maxPage = Math.ceil(media.totalItems / media.limit);

  return (
    <CatalogTemplate
      title="Мультфільми"
      initialData={media.data}
      availableGenres={genres.data}
      totalPages={maxPage}
      currentPage={curPage}
    />
  );
}
export default CartoonsPage;
