import { Review } from "@/types/review";

export const dummyReviews: Review[] = [
  {
    rid: "1",
    rating: 2.8,
    createdAt: "2026-03-25T06:00:00.000Z",
    updatedAt: "2026-03-25T06:00:00.000Z",
    author: { uid: "u1", nickname: "지나가던 사람", level: 1384 },
    reviewContent: "너무 맛있고 성능이 훌륭합...",
    likeCount: 16,
  },
  {
    rid: "2",
    rating: 4.2,
    createdAt: "2026-03-24T12:00:00.000Z",
    updatedAt: "2026-03-24T12:00:00.000Z",
    author: { uid: "u2", nickname: "빵순이", level: 512 },
    reviewContent: "분위기도 좋고 빵도 정말 맛있어요!",
    likeCount: 42,
  },
  {
    rid: "3",
    rating: 3.5,
    createdAt: "2026-03-23T18:00:00.000Z",
    updatedAt: "2026-03-23T18:00:00.000Z",
    author: { uid: "u3", nickname: "커피러버", level: 289 },
    reviewContent: "커피와 함께 먹으면 더 맛있어요.",
    likeCount: 8,
  },
];
