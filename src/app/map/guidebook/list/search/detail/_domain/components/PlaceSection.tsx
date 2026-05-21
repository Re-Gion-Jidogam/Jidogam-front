"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import ActionSheet from "@/components/ActionSheet";
import PlaceCard from "@/components/PlaceCard";

import { dummyPlaces } from "../../../_domain/mocks/dummyPlaces";
import { useSearchFilterStore } from "../../../_domain/store/useSearchFilterStore";
import { GUIDEBOOK_COUNT, PLACE_COUNT } from "../constants/guidebookConstants";

interface PlaceSectionProps {
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function PlaceSection({ isAuthor, onEdit, onDelete }: PlaceSectionProps) {
  const router = useRouter();
  const { showVisited, showUnvisited, toggleVisited, toggleUnvisited } =
    useSearchFilterStore();

  const [selectedPid, setSelectedPid] = useState<string | null>(null);

  const noneActive = !showVisited && !showUnvisited;
  const bothActive = showVisited && showUnvisited;

  let filteredPlaces = dummyPlaces;
  if (!noneActive && !bothActive) {
    if (showVisited)
      filteredPlaces = dummyPlaces.filter((place) => place.visited);
    if (showUnvisited)
      filteredPlaces = dummyPlaces.filter((place) => !place.visited);
  }

  function handlePlaceClick(pid: string) {
    router.push(`/map/place/${pid}`);
  }

  function handleOptionClick(pid: string) {
    setSelectedPid(pid);
  }

  function handleEditClick() {
    onEdit();
    setSelectedPid(null);
  }

  function handleDeleteClick() {
    onDelete();
    setSelectedPid(null);
  }

  function handleCloseActionSheet() {
    setSelectedPid(null);
  }

  return (
    <div className="pb-5">
      <p className="px-5 mb-3 text-sm font-semibold text-gray-900">
        {PLACE_COUNT}개의 장소
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

      <div className="flex flex-col gap-4 px-5 mb-6">
        {filteredPlaces.map((place) => (
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
              point={place.rating}
              address={place.address}
              visitedDate=""
              guidebookCount={GUIDEBOOK_COUNT}
              variant="bottom-button"
              className="w-full! bg-white"
              onOptionClick={
                isAuthor ? () => handleOptionClick(place.pid) : undefined
              }
            />
          </div>
        ))}
      </div>

      {selectedPid !== null && (
        <ActionSheet
          actionSheetTitle="장소 관리"
          onClickBackdrop={handleCloseActionSheet}
          body={
            <>
              <ActionSheet.Button onClick={handleEditClick}>
                편집하기
              </ActionSheet.Button>
              <ActionSheet.Button onClick={handleDeleteClick}>
                삭제
              </ActionSheet.Button>
            </>
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
