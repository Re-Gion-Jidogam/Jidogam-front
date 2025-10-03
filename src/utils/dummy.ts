import { Author, Review } from "@/types/review";

function generateDummyAuthor(index: number): Author {
  return {
    uid: `user-${index}`,
    nickname: `사용자${index}`,
    level: Math.floor(Math.random() * 50) + 1, // 1~50
  };
}

function getRandomDateWithinYears(yearsBack: number = 1): Date {
  const now = new Date().getTime();
  const past = new Date();
  past.setFullYear(past.getFullYear() - yearsBack);

  const pastMs = past.getTime();
  const randomMs = pastMs + Math.random() * (now - pastMs);

  return new Date(randomMs);
}

export function generateDummyReview(index: number): Review {
  const createdAt = getRandomDateWithinYears(2);
  const updatedAt = new Date(
    createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime()),
  );
  const rating = Number((Math.random() * 4 + 1).toFixed(1));

  return {
    rid: `review-${index}`,
    rating,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    author: generateDummyAuthor(index),
    reviewContent: `이것은 리뷰 ${index}의 더미 내용입니다.`,
    likeCount: Math.floor(Math.random() * 1000), // 0~999
  };
}

// 여러 개 생성
export function generateDummyReviews(count: number): Review[] {
  return Array.from({ length: count }, (_, i) => generateDummyReview(i + 1));
}
