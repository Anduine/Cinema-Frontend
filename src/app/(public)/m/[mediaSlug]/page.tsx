import { MediaPage } from "@/components/ui/MediaPage/MediaPage";
import { getMediaDetailBySlug, getMediaTree } from "@/services/media.service";

interface Params {
  mediaSlug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props) {
  const response = await getMediaDetailBySlug((await params).mediaSlug);
  if (!response) {
    return {
      title: "Медіа не знайдено",
    };
  }

  return {
    title: response.data.title,
  };
}

async function PublicMediaPage({ params }: Props) {
  const response = await getMediaDetailBySlug((await params).mediaSlug);

  // console.log("MediaDetail:", response);

  if (!response) {
    return <div className="information-block">Медіа не знайдено</div>;
  }

  // const response2 = await getMediaTree(response.data.id);
  // response.data.mediaTree = response2.data;
  // console.log("MediaTree:", response2);

  return <MediaPage media={response.data} />;
}
export default PublicMediaPage;
