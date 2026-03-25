"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import PlaceCard from "@/components/PlaceCard";
import SVGIcon from "@/components/SVGIcon";

import { dummyPlaces } from "./_mocks/dummyPlaces";
import { useSearchFilterStore } from "./_store/useSearchFilterStore";

export default function GuidebookSearchPage() {
  const router = useRouter();
  const { showVisited, showUnvisited, toggleVisited, toggleUnvisited } =
    useSearchFilterStore();

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
          <p className="text-sm text-gray-600">총 483개의 장소</p>
        </div>

        <FilterChips
          showVisited={showVisited}
          showUnvisited={showUnvisited}
          onToggleVisited={toggleVisited}
          onToggleUnvisited={toggleUnvisited}
        />

        <div className="flex flex-col gap-4 px-5 pb-4 mb-6">
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
                guidebookCount=""
                variant="default"
                className="w-full!"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FilterChipsProps {
  showVisited: boolean;
  showUnvisited: boolean;
  onToggleVisited: () => void;
  onToggleUnvisited: () => void;
}

function FilterChips({
  showVisited,
  showUnvisited,
  onToggleVisited,
  onToggleUnvisited,
}: FilterChipsProps) {
  return (
    <div className="flex gap-2 px-5 pb-4">
      <button
        onClick={onToggleVisited}
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
        onClick={onToggleUnvisited}
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
  );
}
