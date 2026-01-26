"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { dummyPlaces } from "@/constants/dummy";

import BottomSheet from "./BottomSheet";
import SearchBar from "./SearchBar";
import StampCard from "./StampCard";

export default function StampBottomSheet() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [stampTime, setStampTime] = useState(-1);
  const stampRef = useRef<NodeJS.Timeout>(null);

  const bottomSheetOpenHandler = useCallback(
    (value: boolean) => {
      setIsOpen(value);

      if (!value) {
        const stampParams = new URLSearchParams(searchParams);
        stampParams.delete("stamp");

        router.push(`${pathname}?${stampParams.toString()}`, { scroll: false });
      }
    },
    [router, pathname, searchParams],
  );

  const stampClickHandler = () => {
    if (stampRef.current !== null) {
      clearInterval(stampRef.current);
    }

    setStampTime(1 * 60 * 1_000);
    stampRef.current = setInterval(() => {
      setStampTime((prev) => {
        const nextTick = prev - 60 * 1_000;
        if (stampRef.current && nextTick === 0) {
          clearInterval(stampRef.current);
        }
        return nextTick;
      });
    }, 60 * 1_000);
  };

  useEffect(() => {
    if (searchParams.get("stamp") === "true") {
      bottomSheetOpenHandler(true);
    }
  }, [searchParams, bottomSheetOpenHandler]);

  return (
    <BottomSheet
      isOpen={isOpen}
      snapPoint="95vh"
      onClose={() => bottomSheetOpenHandler(false)}
      showBackButton
    >
      <p
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 top-[2.125rem]",
          "text-sm font-semibold text-center",
        )}
      >
        도장찍기
      </p>
      <div className="flex flex-col h-full p-3">
        <div className="min-h-38 max-h-[10.5rem]">
          <div className="mt-8">
            <SearchBar />
          </div>
          <div className="px-2">
            <h3 className="mt-8 mb-1 text-lg font-bold">
              도장 찍을 수 있는 가까운 장소
            </h3>
            {stampTime > 0 && (
              <p className="mb-3 text-xs font-medium text-gray-700">
                {stampTime / (60 * 1_000)}분 뒤에 도장을 찍을 수 있어요.
              </p>
            )}
          </div>
        </div>
        <ul className="flex-1 flex flex-col gap-3 overflow-scroll scrollbar-hide">
          {dummyPlaces.map((p) => (
            <li key={p.name}>
              <StampCard
                variant={
                  p.visitedDate
                    ? "default"
                    : stampTime > 0
                      ? "stamp-disabled"
                      : "stamp"
                }
                placeInfo={p}
                onClick={stampClickHandler}
              />
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  );
}
