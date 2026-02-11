"use client";

import { useState } from "react";

import { dummyPlaces } from "@/constants/dummy";
import { Place } from "@/types/place"; // 타입 경로 확인

import BottomSheet, { SnapPoint } from "./BottomSheet";
import Button from "./Button";
import Modal from "./Modal";
import PlaceCard from "./PlaceCard";
import SearchBar from "./SearchBar";
import StampCard from "./StampCard";

export default function PlaceBottomSheet() {
  const [currentSnap, setCurrentSnap] = useState<SnapPoint>("45vh");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [isClickedStamping, setIsClickedStamping] = useState(false);
  const [isClickedStampingCanceled, setIsClickedStampingCanceled] =
    useState(false);

  return (
    <>
      <BottomSheet
        isOpen={true}
        onClose={() => {}}
        snapPoints={["45vh", "auto"]}
        snapPoint={currentSnap}
        showBackButton={!!selectedPlace}
        onBack={() => {
          setSelectedPlace(null);
          setCurrentSnap("45vh");
        }}
        onSnapChange={(snap) => setCurrentSnap(snap)}
      >
        <div className="w-full flex flex-col gap-8">
          {selectedPlace ? (
            <div className="mt-8 w-full">
              <PlaceCard
                pid={selectedPlace.pid}
                name={selectedPlace.name}
                category={selectedPlace.category}
                point={selectedPlace.point}
                address={selectedPlace.address}
                visitedDate={selectedPlace.visitedDate}
                guidebookCount={selectedPlace.guidebookCount}
                variant="bottom-button"
                className="w-full"
              >
                <Button className="w-full border border-white/60 px-3 py-3">
                  내 가이드북에 추가
                </Button>
                {/* <Button
                  className="w-full border border-white/60 px-3 py-3"
                  onClick={() => setIsClickedStamping(true)}
                >
                  도장찍기
                </Button> */}
                {/* <button className="bg-gray-300 w-full rounded-xl font-semibold text-xs text-gray-700">
                도장 찍기
                <br />
                <span className="font-normal text-[10px]">
                  너무 멀리 있는 장소예요
                </span>
              </button> */}
                <Button
                  color="red"
                  variants="outlined"
                  className="w-full px-3 py-3"
                  onClick={() => setIsClickedStampingCanceled(true)}
                >
                  도장 지우기
                </Button>
              </PlaceCard>
            </div>
          ) : (
            <>
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
                    <div
                      key={place.pid}
                      onClick={() => {
                        {
                          setSelectedPlace(place);
                          setCurrentSnap("auto");
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <StampCard placeInfo={place} variant="none" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </BottomSheet>

      {isClickedStamping && (
        <StampingModal onClickClose={() => setIsClickedStamping(false)} />
      )}

      {isClickedStampingCanceled && (
        <StampingCanceledModal
          onClickClose={() => setIsClickedStampingCanceled(false)}
        />
      )}
    </>
  );
}

function StampingModal({ onClickClose }: { onClickClose: () => void }) {
  return (
    <Modal
      title="도장찍기"
      body={
        <p className="font-normal text-sm text-gray-800 text-center">
          <span className="font-semibold">투썸플레이스 안산그랑시티자이점</span>
          에<br />
          도장을 찍을까요?
          <br />
          <br />
          다른 도장은 30분 후에 찍을 수 있어요.
        </p>
      }
      footer={
        <>
          <Button
            variants="ghost"
            className="w-full py-3"
            onClick={onClickClose}
          >
            취소
          </Button>
          <Button className="w-full py-3">도장찍기</Button>
        </>
      }
      onClickClose={onClickClose}
    />
  );
}

function StampingCanceledModal({ onClickClose }: { onClickClose: () => void }) {
  return (
    <Modal
      title="도장 지우기"
      body={
        <p className="font-normal text-sm text-gray-800 text-center">
          <span className="font-semibold">투썸플레이스 안산그랑시티자이점</span>
          에<br />
          도장을 찍을까요?
          <br />
          <br />
          <span className="text-red-300">
            다른 도장은 30분 후에 찍을 수 있어요.
          </span>
        </p>
      }
      footer={
        <>
          <Button
            variants="ghost"
            className="w-full py-3"
            onClick={onClickClose}
          >
            취소
          </Button>
          <Button color="red" className="w-full py-3">
            도장 지우기
          </Button>
        </>
      }
      onClickClose={onClickClose}
    />
  );
}
