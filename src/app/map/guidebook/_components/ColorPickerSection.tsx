"use client";

import clsx from "clsx";

import { GuidebookModifyCard } from "@/components/GuidebookCard";
import {
  CardValueType,
  GuidebookCardModifyBackgroundLayerMode,
} from "@/components/GuidebookCard/GuidebookModifyCard";

import {
  ACTIVE_SLIDER_VARS,
  DISABLED_SLIDER_VARS,
  DISABLED_TRACK_COLOR,
  RAINBOW_GRADIENT,
  SLIDER_BASE_CLASSES,
  THUMB_CLASSES,
} from "@/app/map/guidebook/_constants/colorPicker";

interface ColorPickerSectionProps {
  color: string | null;
  emoji: string | null;
  thumbnailUrl: string | null;
  sliderValue: number;
  cardMode: GuidebookCardModifyBackgroundLayerMode;
  disabled?: boolean;
  onCardValueChange: (cardValue: CardValueType) => void;
  onSliderChange: (value: number) => void;
  onClickSelectCardType: () => void;
}

export default function ColorPickerSection({
  color,
  emoji,
  thumbnailUrl,
  sliderValue,
  cardMode,
  disabled = false,
  onCardValueChange,
  onSliderChange,
  onClickSelectCardType,
}: ColorPickerSectionProps) {
  return (
    <section className="flex flex-col items-center gap-5">
      <GuidebookModifyCard
        mode={cardMode}
        color={color}
        emoji={emoji}
        thumbnailUrl={thumbnailUrl}
        onChangeCardValue={onCardValueChange}
        onClickSelectCardType={onClickSelectCardType}
      />

      <div
        className={clsx(
          "w-[70%] max-w-xs py-[2px] px-[34px]",
          disabled && "pointer-events-none",
        )}
      >
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          disabled={disabled}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className={clsx(SLIDER_BASE_CLASSES, THUMB_CLASSES)}
          style={
            {
              ...(disabled ? DISABLED_SLIDER_VARS : ACTIVE_SLIDER_VARS),
              background: disabled ? DISABLED_TRACK_COLOR : RAINBOW_GRADIENT,
            } as React.CSSProperties
          }
        />
      </div>
    </section>
  );
}
