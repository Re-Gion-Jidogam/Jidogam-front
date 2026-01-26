"use client";

import { useMemo } from "react";

import clsx from "clsx";

import { Guidebook } from "@/types/guidebook";
import { addPeriodDateFormatter } from "@/utils/date";
import { addCommaFormatter } from "@/utils/number";

import GuidebookCardContainer from "./GuidebookCardContainer";
import { makeEmojiLayout } from "./utils/makeEmojiLayout";

interface GuidebookCardProps {
  type?: "vertical" | "horizontal";
  headerType?: "none" | "rating" | "stampRate";
  guidebook: Guidebook;
  className?: string;
}

export default function GuidebookCard({
  type,
  headerType = "rating",
  guidebook,
  ...props
}: GuidebookCardProps) {
  const {
    color,
    emoji,
    thumbnailUrl,
    rating,
    totalPlaceCount,
    visitedPlaceCount,
  } = guidebook;

  const stampRate = useMemo(() => {
    if (!totalPlaceCount) return 0;
    const r = visitedPlaceCount / totalPlaceCount;
    return Number.isFinite(r) ? Math.max(0, Math.min(1, r)) : 0;
  }, [visitedPlaceCount, totalPlaceCount]);

  const headerComponent = {
    rating: (
      <span className="inline-block mx-3.5 mt-3 py-1 px-2.5 bg-gray-0 text-sm text-gray-900 rounded-full w-fit">
        ★{rating}
      </span>
    ),
    stampRate: (
      <div
        className={clsx(
          "relative flex justify-between mx-3.5 mt-3 p-[1px] bg-white/40",
          "border border-white text-xs font-semibold text-black rounded-full",
          "backdrop-blur-sm",
        )}
      >
        <span className="absolute top-1/2 left-3 -translate-y-1/2">
          {Math.ceil(stampRate * 100)}% 완료
        </span>
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[0.625rem]">
          {visitedPlaceCount.toLocaleString()} /{" "}
          {totalPlaceCount.toLocaleString()}
        </span>
        <div
          className="h-[1.375rem] bg-white text-left rounded-full"
          style={{ flex: `${stampRate}` }}
        ></div>
      </div>
    ),
    none: null,
  };

  return (
    <GuidebookCardContainer
      type={type}
      header={headerComponent[headerType]}
      backgroundLayer={
        <GuidebookCardBackgroundLayer
          type={type}
          color={color}
          emoji={emoji}
          thumbnailUrl={thumbnailUrl}
        />
      }
      content={<GuidebookCardReadOnlyContent guidebook={guidebook} />}
      color={color}
      {...props}
    />
  );
}

interface GuidebookCardBackgroundLayerProps {
  type?: "vertical" | "horizontal";
  emoji: string | null;
  color: string | null;
  thumbnailUrl: string | null;
}

function GuidebookCardBackgroundLayer({
  type = "vertical",
  emoji,
  color,
  thumbnailUrl,
}: GuidebookCardBackgroundLayerProps) {
  const emojiQuantity = type === "vertical" ? 7 : 10;

  return color || emoji ? (
    <div
      className="absolute inset-0 overflow-hidden rounded-[20px] z-0"
      style={{ backgroundColor: color ?? "" }}
    >
      <div className="absolute -translate-x-8 -translate-y-33 will-change-transform">
        {Array.from({ length: emojiQuantity }, (_, i) => (
          <span
            key={i}
            className="absolute text-[6rem]"
            style={{
              transform: makeEmojiLayout({ type, index: i }),
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  ) : (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${thumbnailUrl})` }}
    />
  );
}

interface GuidebookCardReadOnlyContentProps {
  guidebook: Guidebook;
}

function GuidebookCardReadOnlyContent({
  guidebook,
}: GuidebookCardReadOnlyContentProps) {
  const { title, rating, author, totalPlaceCount, publishedDate, point } =
    guidebook;
  const { level, nickname } = author;

  return (
    <>
      <p className="text-[1.125rem] font-bold">{title}</p>
      <div>
        <div>
          <span>Lv. {level}</span>
          <span className="px-0.5"> ‧ </span>
          <span>{nickname}</span>
        </div>
        <div>
          <span>★{rating}</span>
          <span className="px-0.5"> ‧ </span>
          <span>
            총 <strong>{addCommaFormatter(totalPlaceCount)}</strong>개의 장소
          </span>
          <span className="px-0.5"> ‧ </span>
          <span>
            {addPeriodDateFormatter(new Date(publishedDate)).slice(0, -1)}에
            출판
          </span>
        </div>
        <p>
          가이드북 완료 시 <strong>{addCommaFormatter(point)}p</strong>
        </p>
      </div>
    </>
  );
}
