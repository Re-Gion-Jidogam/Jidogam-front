import clsx from "clsx";

import SVGIcon from "./SVGIcon";

interface PlaceCardProps {
  storeName: string;
  storeCategory: string;
  storeScore: number;
  storeAddress: string;
  stampingDay: string;
  containingGuideBookNumber: string;
}

export default function PlaceCard() {
  return <PlaceCardContent {...placeCardData} />;
}

function PlaceCardContent({
  storeName,
  storeCategory,
  storeScore,
  storeAddress,
  stampingDay,
  containingGuideBookNumber,
}: PlaceCardProps) {
  return (
    <div className={clsx("flex flex-col w-fit gap-3.5")}>
      <div className={clsx("flex flex-col gap-1 pl-0.5")}>
        <p className="font-bold text-sm text-gray-900">{storeName}</p>
        <div className={clsx("flex items-center gap-1", "")}>
          <p className="font-normal text-xs text-gray-700">{storeCategory}</p>
          <p className="font-normal text-xs text-gray-700">·</p>
          <div className="flex items-center gap-0.5">
            <SVGIcon icon="GrayStarIcon" />
            <p className="font-normal text-xs text-gray-700">{storeScore}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-normal text-xs text-gray-700">{storeAddress}</p>
          <p className="font-normal text-xs text-gray-700">·</p>
          <p className="font-normal text-xs text-gray-700">
            {stampingDay}에 도장찍음
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="font-normal text-xs text-gray-700">
          이 장소가 포함된 가이드북 {containingGuideBookNumber}개
        </p>
        <SVGIcon icon="GrayRightChevronIcon" />
      </div>
    </div>
  );
}

const placeCardData = {
  storeName: "투썸플레이스 안산그랑시티자이점",
  storeCategory: "카페",
  storeScore: 2.8,
  storeAddress: "경기 안산시 상록구 사동",
  stampingDay: "2025. 5. 14",
  containingGuideBookNumber: "4,928",
};
