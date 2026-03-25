"use client";

import SVGIcon from "@/components/SVGIcon";

interface GuidebookCreateHeaderProps {
  onBack: () => void;
}

export default function GuidebookCreateHeader({
  onBack,
}: GuidebookCreateHeaderProps) {
  return (
    <div className="relative flex items-center justify-center px-4 pt-3 pb-4 shrink-0">
      <button onClick={onBack} className="absolute top-3 left-3 cursor-pointer">
        <SVGIcon icon="BottomSheetLeftChevron" />
      </button>
      <h1 className="text-base font-semibold text-gray-900">가이드북 만들기</h1>
    </div>
  );
}
