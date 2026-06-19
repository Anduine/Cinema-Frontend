export interface CommentAuthor {
  id: string;
  username: string;
  avatarURL?: string;
}

export interface Comment {
  id: string;
  userId: string;
  mediaId: string;
  parentId?: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;

  author?: CommentAuthor;

  replies?: Comment[];
}

export interface PaginatedComments {
  data: Comment[];
  totalItems: number;
  totalPages: number;
  page: number;
}
