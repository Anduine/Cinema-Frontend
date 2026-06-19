import { Season } from "./Season";
import { Translation } from "./Translation";

export interface MediaTree {
  mediaId: string;
  availableTranslations: Translation[];
  seasons: Season[];
}
