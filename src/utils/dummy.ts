import { Author } from "@/types/guidebook";
import { Review } from "@/types/review";

/**
 * 주어진 인덱스를 기반으로 더미 Author 객체를 생성합니다.
 *
 * @param {number} index - 더미 데이터를 구분할 인덱스
 * @returns {Author} 더미 Author 객체
 */
function generateDummyAuthor(index: number): Author {
  return {
    uid: `user-${index}`,
    nickname: `사용자${index}`,
    level: Math.floor(Math.random() * 50) + 1, // 1~50
  };
}

/**
 * 현재 시점 기준으로 과거 N년 이내의 랜덤한 날짜를 생성합니다.
 *
 * @param {number} [yearsBack=1] - 몇 년 전까지를 범위로 할지 (기본값 1년)
 * @returns {Date} 랜덤으로 생성된 날짜 객체
 */
function getRandomDateWithinYears(yearsBack: number = 1): Date {
  const now = new Date().getTime();
  const past = new Date();
  past.setFullYear(past.getFullYear() - yearsBack);

  const pastMs = past.getTime();
  const randomMs = pastMs + Math.random() * (now - pastMs);

  return new Date(randomMs);
}

/**
 * 주어진 인덱스를 기반으로 더미 Review 객체를 생성합니다.
 *
 * @param {number} index - 더미 데이터를 구분할 인덱스
 * @returns {Review} 더미 Review 객체
 */
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

/**
 * 지정한 개수만큼 더미 Review 리스트를 생성합니다.
 *
 * @param {number} count - 생성할 더미 Review 개수
 * @returns {Review[]} 더미 Review 객체 배열
 */

export function generateDummyReviews(count: number): Review[] {
  return Array.from({ length: count }, (_, i) => generateDummyReview(i + 1));
}
