"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

interface ActionSheetProps {
  body?: ReactNode;
  footer?: ReactNode;
  actionSheetTitle: string;
  onClickBackdrop?: () => void;
}

function ActionSheetContainer({
  actionSheetTitle,
  body,
  footer,
  onClickBackdrop,
}: ActionSheetProps) {
  return (
    <div className="fixed inset-0 px-3 text-gray-900 animate-fade-in">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"
        onClick={onClickBackdrop}
      />
      <div className="absolute bottom-4 flex flex-col gap-2 w-[calc(100%-24px)]">
        <div className="overflow-hidden bg-blue-200 rounded-xl">
          <p className="py-3 bg-black/20 text-xs font-semibold text-gray-900 text-center">
            {actionSheetTitle}
          </p>
          <ul className="bg-gray-0">{body}</ul>
        </div>
        <div className="overflow-hidden bg-gray-0 font-bold text-center rounded-xl">
          {footer}
        </div>
      </div>
    </div>
  );
}

function ActionSheetButton({
  children,
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <li
      className={clsx(
        "p-3.5 border-t border-gray-300 text-center",
        "bg-white/90 text-gray-700",
        "hover:bg-gray-0 hover:text-gray-900",
        "cursor-pointer transition-colors",
        className,
      )}
    >
      <button className="w-full cursor-pointer" disabled={disabled} {...props}>
        {children}
      </button>
    </li>
  );
}

const ActionSheet = Object.assign(ActionSheetContainer, {
  Button: ActionSheetButton,
});

export default ActionSheet;
