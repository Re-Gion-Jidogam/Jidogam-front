"use client";

import { ChangeEvent, useEffect, useState } from "react";

import clsx from "clsx";

import { Guidebook } from "@/types/guidebook";
import { addPeriodDateFormatter } from "@/utils/date";

import SVGIcon, { IconSetKeyType } from "../SVGIcon";

import GuidebookCardContainer from "./GuidebookCardContainer";
import { makeEmojiLayout } from "./utils/makeEmojiLayout";

export type GuidebookCardModifyBackgroundLayerMode =
  | "none"
  | "emojiReady"
  | "inserted";

export interface CardValueType {
  color: string | null;
  emoji: string | null;
  thumbnailUrl: string | null;
}

interface GuidebookModifyCardProps {
  mode?: GuidebookCardModifyBackgroundLayerMode;
  color: Guidebook["color"];
  emoji: Guidebook["emoji"];
  thumbnailUrl: Guidebook["thumbnailUrl"];
  onChangeCardValue: (nextCardValue: CardValueType) => void;
  onClickSelectCardType: () => void;
}

export default function GuidebookModifyCard({
  mode = "none",
  color,
  emoji,
  thumbnailUrl,
  onChangeCardValue,
  onClickSelectCardType,
}: GuidebookModifyCardProps) {
  const [modifyMode, setModifyMode] =
    useState<GuidebookCardModifyBackgroundLayerMode>(mode);

  const handleChangeModifyMode = (
    nextMode: GuidebookCardModifyBackgroundLayerMode,
  ) => {
    setModifyMode(nextMode);
  };

  useEffect(() => {
    setModifyMode(mode);
  }, [mode]);

  return (
    <GuidebookCardContainer
      color={color}
      content={<GuidebookCardModifyContent />}
      backgroundLayer={
        <GuidebookCardModifyBackgroundLayer
          mode={modifyMode}
          color={color}
          emoji={emoji}
          thumbnailUrl={thumbnailUrl}
          onChangeModifyMode={handleChangeModifyMode}
          onChangeCardValue={onChangeCardValue}
          onClickSelectCardType={onClickSelectCardType}
        />
      }
    />
  );
}

interface GuidebookCardModifyBackgroundLayerProps {
  mode?: GuidebookCardModifyBackgroundLayerMode;
  emoji: string | null;
  color: string | null;
  thumbnailUrl: string | null;
  onChangeModifyMode: (
    nextMode: GuidebookCardModifyBackgroundLayerMode,
  ) => void;
  onChangeCardValue: (nextCardValue: CardValueType) => void;
  onClickSelectCardType: () => void;
}

const keyOfEmoji: Record<
  GuidebookCardModifyBackgroundLayerMode,
  IconSetKeyType
> = {
  none: "DotCircleAddIcon",
  emojiReady: "DotCircleEmptyStringIcon",
  inserted: "DotCircleChangeIcon",
};

function GuidebookCardModifyBackgroundLayer({
  mode = "none",
  emoji,
  color,
  thumbnailUrl,
  onChangeModifyMode,
  onChangeCardValue,
  onClickSelectCardType,
}: GuidebookCardModifyBackgroundLayerProps) {
  const handleClickDotCircleButton = () => {
    if (mode === "none") {
      onClickSelectCardType();
    }
    if (mode === "inserted") {
      onChangeModifyMode("emojiReady");
      onChangeCardValue({
        color,
        thumbnailUrl,
        emoji: "",
      });
    }
  };

  const handleChangeEmojiValue = (e: ChangeEvent<HTMLInputElement>) => {
    const currentEmojiValue = e.target.value;

    if (currentEmojiValue.length > 0) {
      onChangeModifyMode("inserted");
      onChangeCardValue({
        color,
        thumbnailUrl,
        emoji: currentEmojiValue,
      });
    }
  };

  return color || emoji ? (
    <div
      className="absolute inset-0 overflow-hidden rounded-[20px]"
      style={{ backgroundColor: color ?? "" }}
    >
      <button
        className={clsx(
          "absolute top-[2.7625rem] left-1/2 -translate-x-1/2 cursor-pointer",
          {
            "z-20": mode !== "emojiReady",
          },
        )}
        onClick={handleClickDotCircleButton}
      >
        <SVGIcon icon={keyOfEmoji[mode]} />
      </button>

      {mode === "emojiReady" && (
        <input
          className={clsx(
            "absolute top-[4.75rem] left-1/2 -translate-x-1/2 w-16 z-10",
            "outline-none text-5xl text-center",
          )}
          onChange={handleChangeEmojiValue}
        />
      )}

      <div className="absolute -translate-x-8 -translate-y-33 will-change-transform">
        {Array.from({ length: 7 }, (_, i) => (
          <span
            key={i}
            className="absolute text-[6rem]"
            style={{
              transform: makeEmojiLayout({ type: "vertical", index: i }),
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

function GuidebookCardModifyContent() {
  return (
    <>
      <p className="text-[1.125rem] font-bold">어디가지</p>
      <div>
        <div>
          <div>
            총 <strong>0</strong>개의 장소
          </div>
          <div>{addPeriodDateFormatter(new Date()).slice(0, -1)}에 생성됨</div>
        </div>
      </div>
    </>
  );
}
