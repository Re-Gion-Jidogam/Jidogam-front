"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import Button from "@/components/Button";
import PlaceCard from "@/components/PlaceCard";
import ReviewCard from "@/components/ReviewCard";
import SVGIcon from "@/components/SVGIcon";

import { dummyPlaces } from "../_mocks/dummyPlaces";
import { dummyReviews } from "../_mocks/dummyReviews";
import { useSearchFilterStore } from "../_store/useSearchFilterStore";

interface ChallengeButtonConfig {
  label: string;
  color?: "green" | "red";
  variants?: "primary" | "outlined";
  disabled?: boolean;
  subText?: string;
}

export default function GuidebookDetailPage() {
  const router = useRouter();

  const isChallenging = false;
  const isMaxChallenges = false;

  const { showVisited, showUnvisited, toggleVisited, toggleUnvisited } =
    useSearchFilterStore();

  const challengeButtonProps: ChallengeButtonConfig = (() => {
    if (isMaxChallenges)
      return {
        label: "도전하기",
        disabled: true,
        subText: "20개까지만 도전가능해요",
      };
    if (isChallenging)
      return { label: "도전 취소", color: "red", variants: "outlined" };
    return { label: "도전하기", color: "green", variants: "primary" };
  })();

  const filteredPlaces = useMemo(() => {
    const noneActive = !showVisited && !showUnvisited;
    const bothActive = showVisited && showUnvisited;

    if (noneActive || bothActive) return dummyPlaces;
    if (showVisited) return dummyPlaces.filter((place) => place.visited);
    if (showUnvisited) return dummyPlaces.filter((place) => !place.visited);

    return dummyPlaces;
  }, [showVisited, showUnvisited]);

  function handlePlaceClick(pid: string) {
    router.push(`/map/place/${pid}`);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[62vh] z-50 flex flex-col bg-[#F5F5F5]/80 rounded-t-2xl shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-black/30 rounded-[10px]" />
        <button
          onClick={() => router.back()}
          className="absolute top-3 left-3 cursor-pointer"
        >
          <SVGIcon icon="BottomSheetLeftChevron" />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pt-4">
        <div className="px-5 pt-2 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">전국 빵집 리스트</h1>
          <p className="text-sm text-gray-600 mt-1">Lv. 3132 · 지나가던 사람</p>
        </div>

        <div className="flex gap-3 px-5 pb-5">
          <div className="flex flex-1 flex-col items-center gap-1">
            <Button
              color={challengeButtonProps.color ?? "green"}
              variants={challengeButtonProps.variants ?? "primary"}
              disabled={challengeButtonProps.disabled}
              className="w-full py-3"
            >
              {challengeButtonProps.label}
            </Button>
            {challengeButtonProps.subText && (
              <p className="text-xs text-gray-500">
                {challengeButtonProps.subText}
              </p>
            )}
          </div>
          <Button color="green" variants="outlined" className="flex-1 py-3">
            리뷰쓰기
          </Button>
        </div>

        <div className="pb-5">
          <p className="px-5 mb-3 text-sm font-semibold text-gray-900">
            881개의 리뷰
          </p>
          <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide">
            {dummyReviews.map((review) => (
              <ReviewCard key={review.rid} review={review} />
            ))}
          </div>
        </div>

        <div className="pb-5">
          <p className="px-5 mb-3 text-sm font-semibold text-gray-900">
            8,819개의 장소
          </p>

          <div className="flex gap-2 px-5 mb-3">
            <button
              onClick={toggleVisited}
              className={clsx(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors",
                showVisited
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300",
              )}
            >
              <span>✓</span>
              <span>방문완료</span>
            </button>
            <button
              onClick={toggleUnvisited}
              className={clsx(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors",
                showUnvisited
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300",
              )}
            >
              <span>✺</span>
              <span>미방문</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 px-5 mb-6">
            {filteredPlaces.map((place) => (
              <button
                key={place.pid}
                className="text-left w-full"
                onClick={() => handlePlaceClick(place.pid)}
              >
                <PlaceCard
                  pid={place.pid}
                  name={place.name}
                  category={place.category}
                  point={place.rating}
                  address={place.address}
                  visitedDate=""
                  guidebookCount="4,928"
                  variant="bottom-button"
                  className="w-full!"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
