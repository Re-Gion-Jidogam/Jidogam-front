import Image from "next/image";
import Link from "next/link";

import profileBadge from "@/assets/imgs/profile-badge.png";
import ProfileMap from "@/assets/imgs/profile-map.png";
import ProfileWishGuideBookCover from "@/assets/imgs/profile-wish-guide-book-cover.png";
import ProfileWishListCover from "@/assets/imgs/profile-wish-list-cover.png";
import SVGIcon from "@/components/SVGIcon";
import { formatRelativeTimeIntl } from "@/utils/time";

const reviewData = [
  {
    id: 1,
    guidebook_id: 1,
    user_id: 1,
    content: "너무 맛있고 성능이 훌륭합니다. 스트레스 해소용으로 딱이에요!",
    star: 2.8,
    good: 16,
    createdAt: "2023-10-01T10:00:00Z",
  },
  {
    id: 1,
    guidebook_id: 1,
    user_id: 1,
    content: "너무 맛있고 성능이 훌륭합니다. 스트레스 해소용으로 딱이에요!",
    star: 2.8,
    good: 16,
    createdAt: "2023-10-01T10:00:00Z",
  },
  {
    id: 1,
    guidebook_id: 1,
    user_id: 1,
    content: "너무 맛있고 성능이 훌륭합니다. 스트레스 해소용으로 딱이에요!",
    star: 2.8,
    good: 16,
    createdAt: "2023-10-01T10:00:00Z",
  },
  {
    id: 1,
    guidebook_id: 1,
    user_id: 1,
    content: "너무 맛있고 성능이 훌륭합니다. 스트레스 해소용으로 딱이에요!",
    star: 2.8,
    good: 16,
    createdAt: "2023-10-01T10:00:00Z",
  },
];

export default function Page() {
  return (
    <div className="pt-14 px-3 flex flex-col gap-6 bg-[#F5F5F5]">
      <p className="pl-3 font-semibold text-4xl text-gray-900">내 정보</p>

      {/* 첫 번째 프로필 카드 */}
      <div className="w-full flex flex-col py-6 gap-3.5 items-center justify-center bg-white rounded-2xl">
        <div className="flex gap-2.5 items-center">
          <Image src={profileBadge} alt="BADGE" priority />
          <span className="font-normal text-sm text-gray-700">+5</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center">
            <p className="font-semibold text-lg text-gray-900">지나가던 사람</p>
            <SVGIcon icon="RightGrayArrow" className="w-6 h-6" />
          </div>
          <p className="font-normal text-xs text-gray-700">Lv. 5123</p>
        </div>
      </div>

      <Link
        href="/profile/detail"
        className="w-full flex gap-3.5 items-center justify-center bg-white rounded-2xl"
      >
        <div className="flex gap-2.5 items-center">
          <Image src={ProfileMap} alt="MAP" height={180} />
        </div>
        <div className="flex flex-col justify-center gap-0.5">
          <div className="flex items-center">
            <p className="font-semibold text-sm text-gray-900">
              내가 만든 가이드북
            </p>
            <SVGIcon icon="RightGrayArrow" className="w-4.5 h-4.5" />
          </div>
          <p className="font-normal text-[10px] text-gray-700">
            89개의 가이드북
          </p>
        </div>
      </Link>

      {/* 세 번째 줄 프로필 카드 2개 */}
      <div className="w-full flex gap-3 items-center justify-center">
        <div className="w-full h-[148px] flex gap-3.5 py-3 px-3.5 items-end justify-start bg-white rounded-2xl overflow-hidden relative">
          <Image
            src={ProfileWishListCover}
            alt="MAP"
            width={400}
            height={300}
            className="absolute left-[-20px] top-[-5px] scale-150"
          />
          <div className="flex flex-col justify-center gap-1 z-1">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-sm text-gray-900">찜한 장소</p>
              <SVGIcon icon="RightGrayArrow" className="w-4.5 h-4.5" />
            </div>
            <p className="font-normal text-[10px] text-gray-700">
              8,389개의 장소 찜
            </p>
          </div>
        </div>
        <div className="w-full h-[148px] flex gap-3.5 py-3 px-3.5 items-end justify-start bg-white rounded-2xl overflow-hidden relative">
          <Image
            src={ProfileWishGuideBookCover}
            alt="MAP"
            width={400}
            height={300}
            className="absolute top-[10px] left-[-5px] right-0 scale-100"
          />
          <div className="flex flex-col justify-center gap-1 z-1">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-sm text-gray-900">
                찜한 가이드북
              </p>
              <SVGIcon icon="RightGrayArrow" className="w-4.5 h-4.5" />
            </div>
            <p className="font-normal text-[10px] text-gray-700">
              8,389개의 가이드북 찜
            </p>
          </div>
        </div>
      </div>

      {/* 네 번째 요소, 리뷰 리스트 */}
      <div className="w-full flex flex-col gap-3 items-start justify-center">
        <div className="flex items-center gap-2">
          <p className="font-bold text-lg text-gray-900">최근에 남긴 리뷰</p>
          <SVGIcon
            icon="RightGrayArrow"
            className="w-[18px] h-[18px] scale-130"
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          {reviewData.map((review, index) => (
            <div
              key={index}
              className="w-full flex  gap-2 p-3 bg-white rounded-lg items-end"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col pl-0.5 gap-1">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <SVGIcon icon="GrayStarIcon" className="w-2 h-2" />
                      <span className="font-normal text-xs text-gray-600">
                        {review.star}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-600">
                      {formatRelativeTimeIntl(new Date(review.createdAt))}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <span className="font-normal text-xs text-gray-600">
                        지나가던 사람
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-600">Lv. 1384</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-1 pl-0.5">
                  {review.content}
                </p>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg py-2 px-3">
                <SVGIcon icon="GrayThumbUpIcon" className="w-3 h-2.5" />
                <span className="text-sm text-gray-700">{review.good}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
