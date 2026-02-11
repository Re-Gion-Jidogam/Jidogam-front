"use client";

import { useState } from "react";

import { dummyPlaces } from "@/constants/dummy";

import BottomSheet from "./BottomSheet";
import SearchBar from "./SearchBar";
import StampCard from "./StampCard";

export default function PlaceBottomSheet() {
  const [currentSnap, setCurrentSnap] = useState<string>("45vh");

  return (
    <BottomSheet
      isOpen={true}
      onClose={() => {}}
      snapPoints={["45vh", "auto"]}
      snapPoint="45vh"
      showBackButton={false}
      onSnapChange={(snap) => setCurrentSnap(snap)}
    >
      <div className="w-full flex flex-col gap-8">
        <SearchBar
          placeholder="어디로 가볼까요?"
          className="bg-white border border-gray-200"
        />
        {currentSnap !== "auto" && (
          <div className="flex flex-col gap-3">
            <p className="px-2 font-bold text-lg text-gray-900">
              여기는 어때요?
            </p>
            {dummyPlaces.map((place) => (
              <StampCard placeInfo={place} variant="none" key={place.pid} />
            ))}
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
