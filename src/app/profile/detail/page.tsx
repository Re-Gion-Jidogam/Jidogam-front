"use client";

import { useEffect, useState } from "react";

import { GuidebookCard } from "@/components/GuidebookCard";
import SVGIcon from "@/components/SVGIcon";
import ToggleGroup from "@/components/ToggleGroup";
import { dummyGuidebooks } from "@/constants/dummy";

export default function Page() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowHeader(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full py-16 px-3 flex flex-col gap-8">
      {/* 기본 헤더 */}
      <div className="flex items-center gap-1">
        <SVGIcon icon="RightGrayArrow" className="w-8 h-8 -scale-x-100" />
        <p className="font-bold text-2xl text-black">내가 만든 가이드북</p>
      </div>

      {/* 스크롤 시 위에 나오는 헤더 */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-center px-3 py-3 transition-all duration-200
    ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <SVGIcon
          icon="RightGrayArrow"
          className="w-6 h-6 -scale-x-100 absolute left-3"
        />
        <p className="font-medium text-sm text-gray-900">내가 만든 가이드북</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <ToggleGroup
          items={[
            {
              id: "published",
              image: selectedValues.includes("published")
                ? "ToggleGroupWhiteCheck"
                : "ToggleGroupCheck",
              label: "출판됨",
            },
            {
              id: "nondisclosure",
              image: selectedValues.includes("nondisclosure")
                ? "ToggleGroupWhiteLoading"
                : "ToggleGroupLoading",
              label: "비공개",
            },
          ]}
          selectedValues={selectedValues}
          onValueChange={setSelectedValues}
        />
        {dummyGuidebooks.map((guidebook) => (
          <GuidebookCard
            key={guidebook.gid}
            type="horizontal"
            headerType={guidebook.updatedAt ? "stampRate" : "rating"}
            guidebook={guidebook}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
