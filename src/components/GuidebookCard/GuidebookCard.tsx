"use client";

import { Guidebook } from "@/types/guidebook";
import { addPeriodDateFormatter } from "@/utils/date";
import { addCommaFormatter } from "@/utils/number";

import GuidebookCardContainer from "./GuidebookCardContainer";
import { makeEmojiLayout } from "./utils/makeEmojiLayout";

interface GuidebookCardProps {
  guidebook: Guidebook;
  className?: string;
}

export default function GuidebookCard({
  guidebook,
  ...props
}: GuidebookCardProps) {
  const { color, emoji, thumbnailUrl, rating } = guidebook;

  return (
    <GuidebookCardContainer
      header={
        <span className="inline-block m-4 py-1 px-2.5 bg-gray-0 text-sm text-gray-900 rounded-full w-fit">
          ★{rating}
        </span>
      }
      backgroundLayer={
        <GuidebookCardBackgroundLayer
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
  emoji: string | null;
  color: string | null;
  thumbnailUrl: string | null;
}

function GuidebookCardBackgroundLayer({
  emoji,
  color,
  thumbnailUrl,
}: GuidebookCardBackgroundLayerProps) {
  return color || emoji ? (
    <div
      className="absolute inset-0 overflow-hidden rounded-[20px] z-0"
      style={{ backgroundColor: color ?? "" }}
    >
      <div className="absolute -translate-x-8 -translate-y-33 will-change-transform">
        {Array.from({ length: 7 }, (_, i) => (
          <span
            key={i}
            className="absolute text-[6rem]"
            style={{
              transform: makeEmojiLayout(i),
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
