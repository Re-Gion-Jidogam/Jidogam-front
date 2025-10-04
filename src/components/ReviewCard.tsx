import clsx from "clsx";

import { Review } from "@/types/review";
import { formatRelativeTimeIntl } from "@/utils/time";

import SVGIcon from "./SVGIcon";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { rating, createdAt, updatedAt, author, reviewContent, likeCount } =
    review;
  const { nickname, level } = author;

  return (
    <div className="flex items-stretch gap-2 w-[15.875rem] p-3 bg-white rounded-lg">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1 text-[0.625rem] text-gray-600">
          <div>
            <span>⋆{rating.toFixed?.(1) ?? rating}</span>
            <span> ・ </span>
            <span>
              {formatRelativeTimeIntl(new Date(updatedAt ?? createdAt))}
            </span>
          </div>
          <div>
            <span>{nickname}</span>
            <span> ・ </span>
            <span>Lv. {level}</span>
          </div>
        </div>
        <p className="truncate text-sm font-normal break-words">
          {reviewContent}
        </p>
      </div>

      <button
        className={clsx(
          "self-end inline-flex items-center gap-1 px-3 py-2",
          "bg-gray-50 text-gray-700 rounded-lg cursor-pointer",
        )}
      >
        <SVGIcon icon="ThumbsUpIcon" />
        <span>{likeCount.toLocaleString()}</span>
      </button>
    </div>
  );
}
