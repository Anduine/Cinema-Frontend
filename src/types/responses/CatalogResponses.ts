import { Category } from "../Category";
import { Genre } from "../Genre";
import { MediaDetail } from "../MediaDetail";
import { MediaItem } from "../MediaItem";
import { MediaTree } from "../MediaTree";
import { Translation } from "../Translation";

export interface CategoriesResponse {
  data: Category[];
  total: number;
}

export interface GenreRespone {
  data: Genre;
}

export interface GenresResponse {
  data: Genre[];
  total: number;
}

export interface GenresDictRespone {
  data: {
    categorySlug: string;
    genres: Genre[];
  }[];
}

export interface MediaListResponse {
  data: MediaItem[];

  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface MediaDetailResponse {
  data: MediaDetail;
}

export interface MediaTreeResponse {
  data: MediaTree;
}

export interface TranslationsResponse {
  data: Translation[];
  total: number;
}

export interface TranslationResponse {
  data: Translation;
}

export interface UploadVideoURLResponse {
  uploadURL: string;
  objectName: string;
  streamId: string;
}
