"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import ActionSheet from "@/components/ActionSheet";
import PlaceCard from "@/components/PlaceCard";
import Toast from "@/components/Toast";

import { useSearchFilterStore } from "../../../_domain/store/useSearchFilterStore";
import type { GuidebookPlaceFilter } from "@/app/map/guidebook/_domain/api/guidebook.api";
import { useGuidebookPlacesQuery } from "../queries/useGuidebookPlacesQuery";
import { useRemovePlaceMutation } from "../hooks/useRemovePlaceMutation";

interface PlaceSectionProps {
  guidebookId: string | null;
  isAuthor: boolean;
  totalPlaceCount: number;
}

function deriveFilter(
  showVisited: boolean,
  showUnvisited: boolean,
): GuidebookPlaceFilter | undefined {
  if (showVisited === showUnvisited) return undefined;
  return showVisited ? "visited" : "notVisited";
}

function formatVisitedDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

export function PlaceSection({
  guidebookId,
  isAuthor,
  totalPlaceCount,
}: PlaceSectionProps) {
  const router = useRouter();
  const { showVisited, showUnvisited, toggleVisited, toggleUnvisited } =
    useSearchFilterStore();

  const filter = deriveFilter(showVisited, showUnvisited);

  const {
    data,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGuidebookPlacesQuery({ guidebookId, filter });

  const places = data?.pages.flatMap((page) => page.data) ?? [];

  const [selectedPid, setSelectedPid] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState(false);
  const [deleteToast, setDeleteToast] = useState<"success" | "error" | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { mutate: removePlace } = useRemovePlaceMutation({
    guidebookId: guidebookId ?? "",
    onSuccess: () => setDeleteToast("success"),
    onError: () => setDeleteToast("error"),
  });

  useEffect(() => {
    if (!isError) return;
    setErrorToast(true);
    const timer = setTimeout(() => setErrorToast(false), 3000);
    return () => clearTimeout(timer);
  }, [isError]);

  useEffect(() => {
    if (!deleteToast) return;
    const timer = setTimeout(() => setDeleteToast(null), 3000);
    return () => clearTimeout(timer);
  }, [deleteToast]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { threshold: 0.1 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  function handlePlaceClick(pid: string) {
    router.push(`/map/place/${pid}`);
  }

  function handleOptionClick(pid: string) {
    setSelectedPid(pid);
  }

  function handleDeleteClick() {
    if (selectedPid) removePlace(selectedPid);
    setSelectedPid(null);
  }

  function handleCloseActionSheet() {
    setSelectedPid(null);
  }

  return (
    <div className="pb-5">
      {errorToast && (
        <div className="fixed top-0 left-0 right-0 z-100 w-full">
          <Toast type="NOT_MOVE" title="장소를 불러오지 못했어요" message="" />
        </div>
      )}
      {deleteToast === "success" && (
        <div className="fixed top-0 left-0 right-0 z-100 w-full">
          <Toast type="MOVE" title="장소를 삭제했어요" message="" />
        </div>
      )}
      {deleteToast === "error" && (
        <div className="fixed top-0 left-0 right-0 z-100 w-full">
          <Toast type="NOT_MOVE" title="장소 삭제에 실패했어요" message="" />
        </div>
      )}

      <p className="px-5 mb-3 text-sm font-semibold text-gray-900">
        {totalPlaceCount.toLocaleString()}개의 장소
      </p>

      <div className="flex gap-2 px-5 mb-3">
        <button
          onClick={toggleVisited}
          className={clsx(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors",
            showVisited
              ? "bg-gray-800 text-white border-gray-800"
              : "bg-white text-gray-700 border-gray-300",
          )}
        >
          <span>✓</span>
          <span>방문완료</span>
        </button>
        <button
          onClick={toggleUnvisited}
          className={clsx(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors",
            showUnvisited
              ? "bg-gray-800 text-white border-gray-800"
              : "bg-white text-gray-700 border-gray-300",
          )}
        >
          <span>✺</span>
          <span>미방문</span>
        </button>
      </div>

      {places.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-gray-500">
          장소가 없어요
        </p>
      ) : (
        <div className="flex flex-col gap-4 px-5 mb-6">
          {places.map((place) => (
            <div
              key={place.pid}
              role="button"
              tabIndex={0}
              className="text-left w-full cursor-pointer"
              onClick={() => handlePlaceClick(place.pid)}
              onKeyDown={(e) => e.key === "Enter" && handlePlaceClick(place.pid)}
            >
              <PlaceCard
                pid={place.pid}
                name={place.name}
                category={place.category}
                point={place.points}
                address={place.address}
                visitedDate={formatVisitedDate(place.visitedDate)}
                guidebookCount={place.guidebookCount.toLocaleString()}
                variant="bottom-button"
                className="w-full! bg-white"
                onOptionClick={
                  isAuthor ? () => handleOptionClick(place.pid) : undefined
                }
              />
            </div>
          ))}
          <div ref={loadMoreRef} />
        </div>
      )}

      {selectedPid !== null && (
        <ActionSheet
          actionSheetTitle="장소 관리"
          onClickBackdrop={handleCloseActionSheet}
          body={
            <ActionSheet.Button onClick={handleDeleteClick}>
              삭제
            </ActionSheet.Button>
          }
          footer={
            <ActionSheet.Button onClick={handleCloseActionSheet}>
              취소
            </ActionSheet.Button>
          }
        />
      )}
    </div>
  );
}
