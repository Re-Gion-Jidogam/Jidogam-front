import { ReactNode } from "react";

import clsx from "clsx";

import { Guidebook } from "@/types/guidebook";

import SVGIcon from "../SVGIcon";

interface GuidebookCardContainerProps {
  backgroundLayer: ReactNode;
  content: ReactNode;
  header?: ReactNode;
  color?: Guidebook["color"];
}

export default function GuidebookCardContainer({
  color,
  backgroundLayer,
  header,
  content,
}: GuidebookCardContainerProps) {
  return (
    <div
      className={clsx(
        "relative w-[15rem] h-[17.375rem] rounded-[20px] overflow-hidden cursor-pointer",
        color,
      )}
    >
      {backgroundLayer}

      <div
        className={clsx(
          "relative flex flex-col w-full h-full",
          "text-gray-0 text-shadow-[0_0_10px_0_rgba(0,0,0,0.2)]",
          {
            "justify-between": header,
            "justify-end": !header,
          },
        )}
      >
        {header}
        <div
          className={clsx(
            "flex flex-col gap-1.5 px-4 pb-4 pt-10",
            "text-[0.625rem]",
            "backdrop-blur-md mask-linear-from-75%",
            "bg-gradient-to-b from-50% to-[rgba(0,0,0,0.2)]",
          )}
        >
          <SVGIcon
            icon="ChevronRightIcon"
            className="absolute top-[3.25rem] right-0"
          />
          {content}
        </div>
      </div>
    </div>
  );
}
