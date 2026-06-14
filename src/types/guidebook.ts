export type Author = {
  uid: string;
  nickname: string;
  level: number;
};

export type GuidebookThumbnail =
  | {
      emoji: string;
      color: string;
      thumbnailUrl: null;
    }
  | {
      emoji: null;
      color: null;
      thumbnailUrl: string;
    };

export type Guidebook = {
  gid: string;
  title: string;
  description: string;
  mapImageUrl: string;
  publishedDate: string;
  createdAt: string;
  updatedAt: string | null;
  participantCount: number;
  score: number;
  totalPlaceCount: number;
  visitedPlaceCount: number;
  exp: number;
  author: Author;
} & GuidebookThumbnail;
