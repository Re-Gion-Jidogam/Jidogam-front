import clsx from "clsx";

import Button from "./Button";
import SVGIcon from "./SVGIcon";

interface PlaceCardProps {
  storeName: string;
  storeCategory: string;
  storeScore: number;
  storeAddress: string;
  stampingDay: string;
  containingGuideBookNumber: string;
  variant?: "bottom-button" | "stamp" | "stamp-disabled";
}

export default function PlaceCard({
  storeName,
  storeCategory,
  storeScore,
  storeAddress,
  stampingDay,
  containingGuideBookNumber,
  variant,
  children,
}: PlaceCardProps & {
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col w-fit gap-3.5 p-4 rounded-xl",
        "border border-gray-200 shadow-[2px_2px_10px_0px_rgba(0,0,0,0.002)]",
      )}
    >
      <PlaceCardContent
        storeName={storeName}
        storeCategory={storeCategory}
        storeScore={storeScore}
        storeAddress={storeAddress}
        stampingDay={stampingDay}
        containingGuideBookNumber={containingGuideBookNumber}
        variant={variant}
      />

      {variant === "bottom-button" && (
        <div className="flex gap-2">{children}</div>
      )}
    </div>
  );
}

function PlaceCardContent({
  storeName,
  storeCategory,
  storeScore,
  storeAddress,
  stampingDay,
  containingGuideBookNumber,
  variant,
}: PlaceCardProps) {
  return (
    <div className={clsx("flex flex-col w-fit gap-3.5")}>
      <div className="flex w-full justify-between">
        <div className={clsx("flex flex-col gap-1 pl-0.5")}>
          <p
            className={clsx("font-bold text-sm", {
              "text-gray-900": variant !== "stamp-disabled",
              "text-gray-500": variant == "stamp-disabled",
            })}
          >
            {storeName}
          </p>
          <div className={clsx("flex items-center gap-1", "")}>
            <p
              className={clsx("font-normal text-xs", {
                "text-gray-700": variant !== "stamp-disabled",
                "text-gray-500": variant == "stamp-disabled",
              })}
            >
              {storeCategory}
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
                {storeScore}
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
              {storeAddress}
            </p>
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
              {stampingDay}에 도장찍음
            </p>
          </div>
        </div>
        {variant === "stamp" && (
          <Button
            color="green"
            className="w-14 h-14 flex flex-col items-center justify-center border border-white/60 !rounded-lg"
          >
            <SVGIcon icon="WhiteStampIcon" />
            <p className="font-semibold text-[10px] text-white">50</p>
          </Button>
        )}
        {variant === "stamp-disabled" && (
          <Button
            className="w-14 h-14 flex flex-col items-center justify-center border border-white/60 !rounded-lg"
            disabled
          >
            <SVGIcon icon="WhiteStampIcon" />
            <p className="font-semibold text-[10px] text-white">50</p>
          </Button>
        )}
      </div>

      <div className="flex items-center">
        <p
          className={clsx("font-normal text-xs", {
            "text-gray-700": variant !== "stamp-disabled",
            "text-gray-500": variant == "stamp-disabled",
          })}
        >
          이 장소가 포함된 가이드북 {containingGuideBookNumber}개
        </p>
        <SVGIcon icon="GrayRightChevronIcon" />
      </div>

      <div className="flex gap-2">
        <SVGIcon icon="PlaceCardImage01" />
        <SVGIcon icon="PlaceCardImage02" />
        <SVGIcon icon="PlaceCardImage03" />
      </div>
    </div>
  );
}
