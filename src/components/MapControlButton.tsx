import clsx from "clsx";

import LocationIcon from "@/assets/icons/location.svg";
import MapVoidIcon from "@/assets/icons/map-void.svg";

interface MapControlButtonProps {
  variant: "single" | "double";
  onLocationClick: () => void;
  onMapClick?: () => void;
  locationAriaLabel?: string;
  mapAriaLabel?: string;
  className?: string;
}

export default function MapControlButton({
  variant,
  onLocationClick,
  onMapClick,
  locationAriaLabel,
  mapAriaLabel,
  className,
}: MapControlButtonProps) {
  const isDouble = variant === "double";

  const buttonClass = (isFirst: boolean, isLast: boolean) =>
    clsx(
      "w-[42px] h-[42px] p-[10px] shrink-0 box-border",
      "bg-white/50 border border-white",
      "flex items-center justify-center cursor-pointer",
      !isDouble && "rounded-xl",
      isDouble && isFirst && "rounded-t-xl",
      isDouble && isLast && "rounded-b-xl",
    );

  const iconClass = "w-[22px] h-[22px] block shrink-0 overflow-visible";

  return (
    <div
      className={clsx(
        "flex flex-col rounded-xl",
        "shadow-[0px_4px_20px_0px_#0000001A]",
        isDouble
          ? "w-[42px] h-[86px] gap-0.5 backdrop-blur-[10px]"
          : "w-[42px] h-[42px]",
        className,
      )}
    >
      {isDouble && (
        <button
          onClick={onMapClick}
          aria-label={mapAriaLabel}
          className={buttonClass(true, false)}
        >
          <MapVoidIcon className={iconClass} />
        </button>
      )}
      <button
        onClick={onLocationClick}
        aria-label={locationAriaLabel}
        className={buttonClass(!isDouble, true)}
      >
        <LocationIcon className={iconClass} />
      </button>
    </div>
  );
}
