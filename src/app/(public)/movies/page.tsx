import { getMediaList } from "@/services/media.service";
import { getGenresByCategory } from "@/services/genres.service";
import CatalogTemplate from "@/components/ui/CatalogTemplate/CatalogTemplate";

interface Params {
  page: string;
  genres: string;
  sort: string;
  q: string;
}

interface PageProps {
  searchParams: Promise<Params>;
}

export function generateMetadata() {
  return {
    title: "Фільми",
  };
}

async function MoviesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const curPage = parseInt(params.page) || 1;

  const mediaResp = await getMediaList({
    category: "movies",
    genres: params.genres,
    sort: params.sort,
    q: params.q,
    page: curPage,
  });

  const genres = await getGenresByCategory("movies");

  if (!mediaResp) {
    return <div className="information-block">Помилка завантаження фільмів</div>;
  }

  return (
    <CatalogTemplate
      title="Фільми"
      initialData={mediaResp.data}
      availableGenres={genres.data}
      totalPages={mediaResp.totalPages || 1}
      currentPage={curPage}
    />
  );
}
export default MoviesPage;
