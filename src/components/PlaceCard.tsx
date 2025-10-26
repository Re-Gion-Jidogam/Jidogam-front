import clsx from "clsx";

import { PlaceCardProps } from "@/types/placecard";

import Button from "./Button";
import SVGIcon from "./SVGIcon";

export default function PlaceCard({
  pid,
  name,
  category,
  point,
  address,
  visitedDate,
  guidebookCount,
  variant,
  children,
  className,
}: PlaceCardProps & {
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col w-fit gap-3.5 p-4 rounded-xl",
        "border border-gray-200 shadow-[2px_2px_10px_0px_rgba(0,0,0,0.002)]",
        className,
      )}
    >
      <PlaceCardContent
        pid={pid}
        name={name}
        category={category}
        point={point}
        address={address}
        visitedDate={visitedDate}
        guidebookCount={guidebookCount}
        variant={variant}
      />

      {variant === "bottom-button" && (
        <div className="flex gap-2">{children}</div>
      )}
    </div>
  );
}

function PlaceCardContent({
  name,
  category,
  point,
  address,
  visitedDate,
  guidebookCount,
  variant,
}: PlaceCardProps) {
  return (
    <div className="flex flex-col w-fit gap-3.5">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1 pl-0.5">
          <p
            className={clsx("font-bold text-sm", {
              "text-gray-900": variant !== "stamp-disabled",
              "text-gray-500": variant == "stamp-disabled",
            })}
          >
            {name}
          </p>
          <div className="flex items-center gap-1">
            <p
              className={clsx("font-normal text-xs", {
                "text-gray-700": variant !== "stamp-disabled",
                "text-gray-500": variant == "stamp-disabled",
              })}
            >
              {category}
            </p>
            <p
              className={clsx("font-normal text-xs", {
                "text-gray-700": variant !== "stamp-disabled",
                "text-gray-500": variant == "stamp-disabled",
              })}
            >
              ·
            </p>
            <div className="flex items-center gap-0.5">
              {variant === "stamp-disabled" ? (
                <SVGIcon icon="LightGrayStarIcon" />
              ) : (
                <SVGIcon icon="GrayStarIcon" />
              )}
              <p
                className={clsx("font-normal text-xs", {
                  "text-gray-700": variant !== "stamp-disabled",
                  "text-gray-500": variant == "stamp-disabled",
                })}
              >
                {point}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p
              className={clsx("font-normal text-xs", {
                "text-gray-700": variant !== "stamp-disabled",
                "text-gray-500": variant == "stamp-disabled",
              })}
            >
              {address}
            </p>
            {variant !== "default" && (
              <>
                <p
                  className={clsx("font-normal text-xs", {
                    "text-gray-700": variant !== "stamp-disabled",
                    "text-gray-500": variant == "stamp-disabled",
                  })}
                >
                  ·
                </p>
                <p
                  className={clsx("font-normal text-xs", {
                    "text-gray-700": variant !== "stamp-disabled",
                    "text-gray-500": variant == "stamp-disabled",
                  })}
                >
                  {visitedDate}에 도장찍음
                </p>
              </>
            )}
          </div>
        </div>
        {variant === "stamp" && (
          <Button
            color="green"
            className="flex flex-col items-center justify-center w-14 h-14 border border-white/60 !rounded-lg"
          >
            <SVGIcon icon="WhiteStampIcon" />
            <p className="font-semibold text-[10px] text-white">50</p>
          </Button>
        )}
        {variant === "stamp-disabled" && (
          <Button
            className="flex flex-col items-center justify-center w-14 h-14 border border-white/60 !rounded-lg"
            disabled
          >
            <SVGIcon icon="WhiteStampIcon" />
            <p className="font-semibold text-[10px] text-white">50</p>
          </Button>
        )}
      </div>

      {variant !== "default" && (
        <div className="flex items-center">
          <p
            className={clsx("font-normal text-xs", {
              "text-gray-700": variant !== "stamp-disabled",
              "text-gray-500": variant == "stamp-disabled",
            })}
          >
            이 장소가 포함된 가이드북 {guidebookCount}개
          </p>
          <SVGIcon
            icon="GrayRightChevronIcon"
            className="w-3.5 h-3.5 fill-gray-700"
          />
        </div>
      )}

      <div className="flex gap-2">
        <SVGIcon icon="PlaceCardImage01" />
        <SVGIcon icon="PlaceCardImage02" />
        <SVGIcon icon="PlaceCardImage03" />
      </div>
    </div>
  );
}
