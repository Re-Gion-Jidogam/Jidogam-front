import ReviewCard from "@/components/ReviewCard";

import { dummyReviews } from "../../../_domain/mocks/dummyReviews";
import { REVIEW_COUNT } from "../constants/guidebookConstants";

export function ReviewSection() {
  return (
    <div className="pb-5">
      <p className="px-5 mb-3 text-sm font-semibold text-gray-900">
        {REVIEW_COUNT}개의 리뷰
      </p>
      <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide">
        {dummyReviews.map((review) => (
          <ReviewCard key={review.rid} review={review} />
        ))}
      </div>
    </div>
  );
}
