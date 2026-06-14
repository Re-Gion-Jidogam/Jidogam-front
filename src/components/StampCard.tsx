import { MouseEvent } from "react";

import clsx from "clsx";
import Image from "next/image";

import TravelStamp from "@/assets/imgs/travel-stamp.png";
import { PlaceCardBase } from "@/types/placecard";

import Button from "./Button";
import SVGIcon from "./SVGIcon";

interface StampCardProps {
  placeInfo: PlaceCardBase;
  variant: "default" | "stamp" | "stamp-disabled";
  onClick?: (e: MouseEvent<HTMLButtonElement>, placeName: string) => void;
}

export default function StampCard({
  placeInfo,
  variant,
  onClick,
}: StampCardProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-between w-full p-4 bg-gray-0",
        "rounded-xl border border-gray-200",
        "shadow-[2px_2px_10px_0px_rgba(0,0,0,0.02)] overflow-hidden",
      )}
    >
      <StampCardContent placeInfo={placeInfo} variant={variant} />
      {variant === "default" && (
        <Image
          className="absolute right-0 scale-[1.25]"
          src={TravelStamp}
          alt="STAMP"
          priority
        />
      )}
      {variant !== "default" && variant !== "none" && (
        <Button
          color="green"
          variants={variant === "stamp" ? "primary" : "ghost"}
          className="flex flex-col items-center justify-center w-14 h-14 border border-white/60 !rounded-lg"
          disabled={variant === "stamp-disabled"}
          onClick={(e) => onClick?.(e, placeInfo.name)}
        >
          <SVGIcon icon="WhiteStampIcon" />
          <p className="font-semibold text-[10px] text-white">50</p>
        </Button>
      )}
    </div>
  );
}

function StampCardContent({ placeInfo, variant }: StampCardProps) {
  const { name, category, point, address, visitedDate } = placeInfo;

  return (
    <div className="w-full rounded-xl gap-3.5 bg-gray-0 flex justify-between">
      <div className="w-full pl-0.5 flex flex-col gap-1">
        <p className="font-bold text-sm text-gray-900">{name}</p>
        <div
          className={clsx(
            "flex items-center gap-1",
            "font-normal text-xs text-gray-700",
          )}
        >
          <span>{category}</span>
          <span>·</span>
          <div className="flex items-center gap-0.5">
            <SVGIcon icon="GrayStarIcon" />
            <span>{point}</span>
          </div>
        </div>
        <div
          className={clsx(
            "flex items-center gap-1",
            "font-normal text-xs text-gray-700",
          )}
        >
          <span>{address}</span>
          {variant === "default" && (
            <>
              <span>·</span>
              <span>{visitedDate}에 도장찍음</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
