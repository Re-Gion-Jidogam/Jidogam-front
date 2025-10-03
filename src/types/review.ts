export interface Author {
  uid: string;
  nickname: string;
  level: number;
}

export interface Review {
  rid: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  reviewContent: string;
  likeCount: number;
}
