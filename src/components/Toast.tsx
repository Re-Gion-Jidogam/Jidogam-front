import clsx from "clsx";

import SVGIcon from "./SVGIcon";

interface ToastMessageProps {
  // type: "MOVE" | "NOT_MOVE";
  title: string;
  message: string;
  maxLength?: number;
  // className?: string;
}

export default function Toast({
  // type,
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
        "fixed top-3 left-1/2 py-3 pl-4 pr-12",
        "rounded-[100px] border border-gray-50 shadow-[0_4px_40px_0_rgba(0,0,0,0.1)]",
        "bg-white flex gap-5 items-center",
      )}
    >
      <SVGIcon icon="ToastCheckIcon" />
      <div className={clsx("flex gap-1", "font-medium text-sm text-gray-900")}>
        <p>{truncatedTitle}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
