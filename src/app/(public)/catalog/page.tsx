import { getMediaList } from "@/services/media.service";
import { getAllGenres } from "@/services/genres.service";
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
    title: "Каталог фільмів та серіалів",
  };
}

async function MoviesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const curPage = parseInt(params.page) || 1;

  const mediaResp = await getMediaList({
    genres: params.genres,
    sort: params.sort,
    q: params.q,
    page: curPage,
  });

  const genresResp = await getAllGenres();

  if (!mediaResp) {
    return <div>Помилка завантаження медіа</div>;
  }

  return (
    <CatalogTemplate
      title="Фільми та серіали"
      initialData={mediaResp.data}
      availableGenres={genresResp.data}
      totalPages={mediaResp.totalPages || 1}
      currentPage={curPage}
    />
  );
}
export default MoviesPage;
