"use client";

import { useState } from "react";

import { GuidebookCard } from "@/components/GuidebookCard";
import MapControlButton from "@/components/MapControlButton";
import SearchBar from "@/components/SearchBar";
import SegmentGroup from "@/components/SegmentGroup";
import ToggleGroup from "@/components/ToggleGroup";

import BannerCard from "./_domain/components/BannerCard";
import GuidebookCreateSheet from "./_domain/components/Guidebook/GuidebookCreateSheet";
import BannerHeart from "./_domain/assets/banner-heart.svg";
import BannerStar from "./_domain/assets/banner-star.svg";
import { MOCK_MY_GUIDEBOOKS } from "./_domain/mocks/guidebooks";

const FILTER_ITEMS = [
  { id: "published", label: "출판됨", image: "ToggleGroupCheck" as const },
];

export default function GuidebookPage() {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredGuidebooks = MOCK_MY_GUIDEBOOKS.filter((g) => {
    if (activeFilters.length === 0) return true;
    if (activeFilters.includes("published") && g.isPublished) return true;
    if (activeFilters.includes("private") && !g.isPublished) return true;
    return false;
  });

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <SegmentGroup
          segments={[
            { label: "내 도장", url: "stamp" },
            { label: "장소", url: "map" },
            { label: "가이드북", url: "guidebook" },
          ]}
        />
      </div>

      <button
        onClick={() => setIsCreateSheetOpen(true)}
        aria-label="가이드북 만들기"
        className="fixed left-4 bottom-[calc(62vh+12px)] z-50 w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-white/50 border border-white shadow-[0px_4px_20px_0px_#0000001A] backdrop-blur-[10px] text-2xl font-light text-gray-700 leading-none cursor-pointer"
      >
        +
      </button>

      <MapControlButton
        variant="double"
        onLocationClick={() => {}}
        className="fixed right-4 bottom-[calc(62vh+12px)] z-50"
      />

      <div className="fixed bottom-0 left-0 right-0 h-[62vh] z-50 flex flex-col bg-[#F5F5F5]/80 backdrop-blur-2xl rounded-t-[20px] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
        <div className="relative flex justify-center items-start pb-[18px]">
          <div className="w-12 h-1 bg-black/30 rounded-[10px] mt-3" />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pb-3 flex flex-col w-full">
          <div className="px-5 pb-4 mt-2">
            <SearchBar placeholder="멋진 가이드북을 검색해보세요" />
          </div>

          <div className="flex gap-3 px-5 pb-5">
            <BannerCard image={BannerStar} variant="star" />
            <BannerCard
              image={BannerHeart}
              label="지나가던사람님을"
              variant="heart"
            />
          </div>

          <div className="flex flex-col gap-3 px-5 pb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                도전중인 가이드북
              </h2>
            </div>

            <ToggleGroup
              items={FILTER_ITEMS}
              selectedValues={activeFilters}
              onValueChange={setActiveFilters}
            />

            <div className="flex flex-col gap-3">
              {filteredGuidebooks.map((guidebook) => (
                <GuidebookCard
                  key={guidebook.gid}
                  type="horizontal"
                  headerType="rating"
                  guidebook={guidebook}
                  className="w-full!"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <GuidebookCreateSheet
        isOpen={isCreateSheetOpen}
        onClose={() => setIsCreateSheetOpen(false)}
      />
    </>
  );
}
