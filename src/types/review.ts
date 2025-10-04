import { Author } from "./guidebook";

export interface Review {
  rid: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  reviewContent: string;
  likeCount: number;
}
