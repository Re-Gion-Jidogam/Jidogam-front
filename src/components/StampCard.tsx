import clsx from "clsx";

import { PlaceCardBase } from "@/types/placecard";

import Button from "./Button";
import SVGIcon from "./SVGIcon";

interface StampCardProps {
  placeInfo: PlaceCardBase;
  variant: "default" | "stamp" | "stamp-disabled";
}

export default function StampCard({ placeInfo, variant }: StampCardProps) {
  return (
    <div
      className={clsx(
        "w-full rounded-xl border border-gray-200 p-4 shadow-[2px_2px_10px_0px_rgba(0,0,0,0.02)] bg-gray-0 relative",
        {
          "flex items-center justify-between": variant !== "default",
        },
      )}
    >
      <StampCardContent placeInfo={placeInfo} variant={variant} />
      {variant === "default" && (
        <SVGIcon
          icon="TravelStampIcon"
          className="absolute top-0 right-0 bottom-0 h-full"
        />
      )}
      {variant !== "default" && (
        <Button
          color="green"
          variants={variant === "stamp" ? "primary" : "ghost"}
          className="flex flex-col items-center justify-center w-14 h-14 border border-white/60 !rounded-lg"
          disabled={variant === "stamp-disabled"}
        >
          <SVGIcon icon="WhiteStampIcon" />
          <p className="font-semibold text-[10px] text-white">50</p>
        </Button>
      )}
    </div>
  );
}

export function StampCardContent({ placeInfo, variant }: StampCardProps) {
  const { name, category, point, address, visitedDate } = placeInfo;

  return (
    <div className="w-full rounded-xl gap-3.5 bg-gray-0 flex justify-between">
      <div className="w-full pl-0.5 flex flex-col gap-1">
        <p className="font-bold text-sm text-gray-900">{name}</p>
        <div className="flex items-center gap-1">
          <p className="font-normal text-xs text-gray-700">{category}</p>
          <p className="font-normal text-xs text-gray-700">·</p>
          <div className="flex items-center gap-0.5">
            <SVGIcon icon="GrayStarIcon" />
            <p className="font-normal text-xs text-gray-700">{point}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-normal text-xs text-gray-700">{address}</p>
          {variant === "default" && (
            <>
              <p className="font-normal text-xs text-gray-700">·</p>
              <p className="font-normal text-xs text-gray-700">
                {visitedDate}에 도장찍음
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
