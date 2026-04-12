import clsx from "clsx";

import SVGIcon from "./SVGIcon";

interface ToastMessageProps {
  type: "MOVE" | "NOT_MOVE";
  title: string;
  message: string;
  maxLength?: number;
  // className?: string;
}

export default function Toast({
  type,
  title,
  message,
  maxLength = 11,
  // className,
}: ToastMessageProps) {
  const truncatedTitle =
    title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  return (
    <div
      className={clsx(
        "fixed top-3 left-1/2 -translate-x-1/2",
        "flex items-center gap-2",
        "py-3 pl-4",
        {
          "pr-8": type === "NOT_MOVE",
          "pr-4": type === "MOVE",
        },
        "bg-white border border-gray-50 rounded-[100px] shadow-[0_4px_40px_0_rgba(0,0,0,0.1)]",
        "bg-white",
      )}
    >
      <div className={clsx("flex items-center gap-5")}>
        <SVGIcon icon="ToastCheckIcon" className="w-10 h-10 shrink-0" />
        <div
          className={clsx(
            "flex gap-1 whitespace-nowrap",
            "font-medium text-sm text-gray-900",
          )}
        >
          <p>{truncatedTitle}</p>
          <p>{message}</p>
        </div>
      </div>
      {type === "MOVE" && (
        <SVGIcon icon="RightGrayArrow" className="w-7 h-7 shrink-0" />
      )}
    </div>
  );
}
