import { ReactNode } from "react";

import clsx from "clsx";

import { Guidebook } from "@/types/guidebook";

import SVGIcon from "../SVGIcon";

interface GuidebookCardContainerProps {
  type?: "vertical" | "horizontal";
  backgroundLayer: ReactNode;
  content: ReactNode;
  header?: ReactNode;
  color?: Guidebook["color"];
  className?: string;
}

export default function GuidebookCardContainer({
  type = "vertical",
  color,
  backgroundLayer,
  header,
  content,
  className,
}: GuidebookCardContainerProps) {
  return (
    <div
      className={clsx(
        "relative rounded-[20px] overflow-hidden cursor-pointer",
        {
          "w-[15rem] h-[17.375rem]": type === "vertical",
          "w-[21.785rem] h-[12.25rem]": type === "horizontal",
        },
        color,
        className,
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
            "flex flex-col gap-1.5 px-4 pb-4",
            "text-[0.625rem]",
            "backdrop-blur-md bg-gradient-to-b from-50% to-black/20",
            {
              "pt-10 mask-linear-from-75%": type === "vertical",
              "justify-end h-[10rem] mask-linear-from-75%":
                type === "horizontal",
            },
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
