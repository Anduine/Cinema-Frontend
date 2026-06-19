import { User, UserProfile } from "../User";
import { Comment } from "../Comment";

export interface UserResponse {
  message?: string;
  status?: number;
  data: User;
}

export interface UserProfileResponse {
  data: UserProfile;
}

export interface CreateCommentResponse {
  data: Comment;
  message: string;
}

export interface MediaInListsResponse {
  data: {
    isFavorite: boolean;
    isWatchLater: boolean;
    isHistory: boolean;
  };
}

export interface RatingResponse {
  data: number;
}

export interface WatchProgressResponse {
  data: { mediaID: string; episodeID: string; translationID: number; progressSeconds: number; isCompleted: boolean };
}
