"use client";

import { FormEvent, InputHTMLAttributes, ReactNode, useRef } from "react";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import SVGIcon from "./SVGIcon";

interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: ReactNode;
  postfix?: ReactNode;
}

export default function SearchBar({
  className,
  placeholder = "무엇이든 검색해보세요",
  postfix = <SVGIcon icon="CloseIcon" />,
  prefix = (
    <i className="pl-2">
      <SVGIcon icon="SearchIcon" />
    </i>
  ),
  ...props
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = searchInputRef.current?.value ?? "";

    if (searchInputRef.current && 0 < value.trim().length) {
      router.push(`${pathname}?word=${value}`);
      searchInputRef.current.value = "";
    }
  };

  const removeSearchWord = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className={clsx(
        "flex items-center gap-2 px-4 py-1.5",
        "rounded-full",
        "shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]",
      )}
    >
      {prefix}
      <input
        ref={searchInputRef}
        placeholder={placeholder}
        className={clsx(
          "peer flex-1 outline-none",
          "text-xs text-gray-800",
          className,
        )}
        {...props}
      />
      {postfix && (
        <button
          type="button"
          className="opacity-100 peer-placeholder-shown:opacity-0 cursor-pointer"
          onClick={removeSearchWord}
        >
          {postfix}
        </button>
      )}
    </form>
  );
}
