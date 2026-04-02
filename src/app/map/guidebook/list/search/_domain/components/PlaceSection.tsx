"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import PlaceCard from "@/components/PlaceCard";

import { dummyPlaces } from "../mocks/dummyPlaces";
import { useSearchFilterStore } from "../store/useSearchFilterStore";
import { FilterChips } from "./FilterChips";

export function PlaceSection() {
  const router = useRouter();
  const { showVisited, showUnvisited, toggleVisited, toggleUnvisited } =
    useSearchFilterStore();

  const filteredPlaces = useMemo(() => {
    const noneActive = !showVisited && !showUnvisited;
    const bothActive = showVisited && showUnvisited;

    if (noneActive || bothActive) return dummyPlaces;
    if (showVisited) return dummyPlaces.filter((place) => place.visited);
    if (showUnvisited) return dummyPlaces.filter((place) => !place.visited);

    return dummyPlaces;
  }, [showVisited, showUnvisited]);

  function handlePlaceClick(pid: string) {
    router.push(`/map/place/${pid}`);
  }

  return (
    <>
      <FilterChips
        showVisited={showVisited}
        showUnvisited={showUnvisited}
        onToggleVisited={toggleVisited}
        onToggleUnvisited={toggleUnvisited}
      />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 flex flex-col gap-4 pb-4">
        {filteredPlaces.map((place) => (
          <button
            key={place.pid}
            className="text-left w-full"
            onClick={() => handlePlaceClick(place.pid)}
          >
            <PlaceCard
              pid={place.pid}
              name={place.name}
              category={place.category}
              point={place.rating}
              address={place.address}
              visitedDate=""
              guidebookCount=""
              variant="default"
              className="w-full! bg-gray-0"
            />
          </button>
        ))}
      </div>
    </>
  );
}
