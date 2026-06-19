import { getMediaDetailById } from "@/services/media.service";
import ContentManagerPage from "@/components/ui/AdminComponents/ContentManager/ContentManagerPage";

export async function generateMetadata() {
  return {
    title: "Медіа - контент",
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

async function Content({ params }: Props) {
  const mediaResp = await getMediaDetailById((await params).id);

  return <ContentManagerPage media={mediaResp.data} />;
}
export default Content;
