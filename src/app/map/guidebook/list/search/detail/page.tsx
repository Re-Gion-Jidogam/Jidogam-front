"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import SVGIcon from "@/components/SVGIcon";

import { ChallengeButton } from "./_domain/components/ChallengeButton";
import { ReviewSection } from "./_domain/components/ReviewSection";
import { PlaceSection } from "./_domain/components/PlaceSection";
import { MAX_CHALLENGE_COUNT } from "./_domain/constants/guidebookConstants";
import { useChallengeQuery } from "./_domain/queries/useChallengeQuery";

export default function GuidebookDetailPage() {
  const router = useRouter();

  const guidebookId = "1";

  const { data } = useChallengeQuery(guidebookId);
  const isChallenging = data?.isChallenging ?? false;
  const isMaxChallenges =
    !isChallenging && (data?.challengeCount ?? 0) >= MAX_CHALLENGE_COUNT;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[62vh] z-50 flex flex-col bg-[#F5F5F5]/80 rounded-t-2xl shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-black/30 rounded-[10px]" />
        <button
          onClick={() => router.back()}
          className="absolute top-3 left-3 cursor-pointer"
        >
          <SVGIcon icon="BottomSheetLeftChevron" />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pt-4">
        <div className="px-5 pt-2 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">전국 빵집 리스트</h1>
          <p className="text-sm text-gray-600 mt-1">Lv. 3132 · 지나가던 사람</p>
        </div>

        <div className="flex gap-3 px-5 pb-5">
          <ChallengeButton
            isChallenging={isChallenging}
            isMaxChallenges={isMaxChallenges}
          />
          <Button color="green" variants="outlined" className="flex-1 py-3">
            리뷰쓰기
          </Button>
        </div>

        <ReviewSection />
        <PlaceSection />
      </div>
    </div>
  );
}
