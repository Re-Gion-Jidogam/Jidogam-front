"use client";

import clsx from "clsx";

import { GuidebookModifyCard } from "@/components/GuidebookCard";
import { CardValueType } from "@/components/GuidebookCard/GuidebookModifyCard";

const RAINBOW_GRADIENT =
  "linear-gradient(90deg, #FF2929 0%, #FF7B29 15.64%, #FFF429 30.69%, #12FF12 46.61%, #2962FF 65.81%, #C929FF 81.88%, #FF292C 99.01%)";

interface ColorPickerSectionProps {
  color: string | null;
  emoji: string | null;
  thumbnailUrl: string | null;
  sliderValue: number;
  onCardValueChange: (cardValue: CardValueType) => void;
  onSliderChange: (value: number) => void;
}

export default function ColorPickerSection({
  color,
  emoji,
  thumbnailUrl,
  sliderValue,
  onCardValueChange,
  onSliderChange,
}: ColorPickerSectionProps) {
  return (
    <section className="flex flex-col items-center gap-5">
      <GuidebookModifyCard
        mode="none"
        color={color}
        emoji={emoji}
        thumbnailUrl={thumbnailUrl}
        onChangeCardValue={onCardValueChange}
        onClickSelectCardType={() => {}}
      />

      <div className="w-full py-[2px] px-[34px]">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className={clsx(
            "w-full h-2 rounded-[100px] cursor-pointer appearance-none",
            "border border-gray-0",
            "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-6",
            "[&::-webkit-slider-thumb]:h-6",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-gray-0/40",
            "[&::-webkit-slider-thumb]:border",
            "[&::-webkit-slider-thumb]:border-gray-0",
            "[&::-webkit-slider-thumb]:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]",
            "[&::-webkit-slider-thumb]:backdrop-blur-[10px]",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:w-6",
            "[&::-moz-range-thumb]:h-6",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-gray-0/40",
            "[&::-moz-range-thumb]:border",
            "[&::-moz-range-thumb]:border-gray-0",
            "[&::-moz-range-thumb]:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]",
            "[&::-moz-range-thumb]:backdrop-blur-[10px]",
            "[&::-moz-range-thumb]:cursor-pointer",
          )}
          style={{ background: RAINBOW_GRADIENT }}
        />
      </div>
    </section>
  );
}
