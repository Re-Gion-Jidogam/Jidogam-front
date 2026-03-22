"use client";

import { useState } from "react";

import { GuidebookCard } from "@/components/GuidebookCard";
import SearchBar from "@/components/SearchBar";
import ToggleGroup from "@/components/ToggleGroup";

import BannerCard from "./_components/BannerCard";
import GuidebookCreateSheet from "./_components/GuidebookCreateSheet";
import BannerHeart from "./_assets/banner-heart.svg";
import BannerStar from "./_assets/banner-star.svg";
import { MOCK_MY_GUIDEBOOKS } from "./_mocks/guidebooks";

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
      <div className="fixed bottom-0 left-0 right-0 h-[62vh] z-50 flex flex-col bg-[#F5F5F5]/80 backdrop-blur-2xl rounded-t-[20px] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
        <div className="relative flex justify-center items-start pb-[18px]">
          <div className="w-12 h-1 bg-black/30 rounded-[10px] mt-3" />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pb-3 flex flex-col w-full">
          <div className="px-5 pb-4 mt-2">
            <SearchBar placeholder="멋진 가이드북을 검색해보세요" />
          </div>

          <div className="flex gap-3 px-5 pb-5">
            <BannerCard
              image={BannerStar}
              label="인기 가이드북"
              variant="star"
            />
            <BannerCard
              image={BannerHeart}
              label="지나가던사람님을"
              secondLine="기다리는 곳"
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
                  className="!w-full"
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
