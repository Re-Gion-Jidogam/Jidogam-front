"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button";
import ActionSheet from "@/components/ActionSheet";
import SVGIcon from "@/components/SVGIcon";

import { ParticipationButton } from "./_domain/components/ParticipationButton";
import { ProgressBar } from "./_domain/components/ProgressBar";
import { ReviewSection } from "./_domain/components/ReviewSection";
import { PlaceSection } from "./_domain/components/PlaceSection";

import { useGuidebookDetailQuery } from "@/app/map/guidebook/_domain/queries/useGuidebookDetailQuery";
import { useUserStore } from "@/store/useUserStore";
import { useDeleteGuidebook } from "@/app/map/guidebook/_domain/hooks/useDeleteGuidebook";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const GuidebookCreateSheet = dynamic(
  () => import("../../../_domain/components/Guidebook/GuidebookCreateSheet"),
  { ssr: false },
);

const ExitConfirmModal = dynamic(
  () => import("../../../_domain/components/Modal/ExitConfirmModal"),
  { ssr: false },
);

const Toast = dynamic(() => import("@/components/Toast"), { ssr: false });

export default function GuidebookDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const guidebookId = searchParams.get("guidebookId");

  const { data: guidebook } = useGuidebookDetailQuery(guidebookId);
  const userId = useUserStore((state) => state.userId);
  const isAuthor = guidebook ? userId !== null && guidebook.author.uid === userId : false;
  const visitedCount = guidebook?.visitedPlaceCount ?? 0;
  const totalCount = guidebook?.totalPlaceCount ?? 0;

  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isGuidebookCreateSheetOpen, setIsGuidebookCreateSheetOpen] =
    useState<boolean>(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [showToast, setIsShowToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const { mutate: deleteGuidebook } = useDeleteGuidebook({
    onSuccess: () => {
      setIsExitModalOpen(false);
      setIsActionSheetOpen(false);
      setIsShowToast(true);
      setTimeout(() => setIsShowToast(false), 2000);
    },
    onError: () => {
      setIsExitModalOpen(false);
      setIsActionSheetOpen(false);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 2000);
    },
  });

  const actionButton = isAuthor ? (
    <Button
      color="green"
      variants="primary"
      className="flex-1 py-3"
      onClick={() => setIsActionSheetOpen(true)}
    >
      관리하기
    </Button>
  ) : (
    <Button color="green" variants="primary" className="flex-1 py-3">
      리뷰쓰기
    </Button>
  );

  return (
    <>
      {showToast && (
        <div
          className="fixed top-0 left-0 right-0 z-100 cursor-pointer w-full"
          onClick={() => router.push("/map/guidebook/list/search/")}
        >
          <Toast type="MOVE" title="가이드북을 삭제했어요" message="" />
        </div>
      )}
      {showErrorToast && (
        <div className="fixed top-0 left-0 right-0 z-100 w-full">
          <Toast type="NOT_MOVE" title="가이드북 삭제에 실패했어요" message="" />
        </div>
      )}
      <div className="fixed bottom-0 z-1 left-0 right-0 h-[62vh] flex flex-col bg-[#F5F5F5]/80 rounded-t-2xl shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-black/30 rounded-[10px] mb-4" />
          <button
            onClick={() => router.back()}
            className="absolute top-3 left-3 cursor-pointer"
          >
            <SVGIcon icon="BottomSheetLeftChevron" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pt-4">
          <div className="px-5 pt-2 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {guidebook?.title ?? ""}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {guidebook
                ? `Lv. ${guidebook.author.level} · ${guidebook.author.nickname}`
                : ""}
            </p>
          </div>

          <div className="flex gap-3 px-5 pb-5">
            <ParticipationButton guidebookId={guidebookId} />
            {actionButton}
          </div>

          <div className="px-5 pb-3">
            <ProgressBar visitedCount={visitedCount} totalCount={totalCount} />
          </div>

          <ReviewSection />
          <PlaceSection
            guidebookId={guidebookId}
            isAuthor={isAuthor}
            totalPlaceCount={totalCount}
          />
        </div>
      </div>
      {isActionSheetOpen &&
        createPortal(
          <div className="fixed z-10">
            <ActionSheet
              actionSheetTitle="가이드북 관리"
              body={
                <>
                  <ActionSheet.Button
                    onClick={() => {
                      setIsGuidebookCreateSheetOpen(true);
                    }}
                  >
                    편집하기
                  </ActionSheet.Button>
                  <ActionSheet.Button
                    className="text-red-200"
                    onClick={() => {
                      setIsExitModalOpen(true);
                    }}
                  >
                    삭제
                  </ActionSheet.Button>
                </>
              }
              footer={
                <>
                  <ActionSheet.Button
                    onClick={() => {
                      setIsActionSheetOpen(false);
                    }}
                  >
                    취소
                  </ActionSheet.Button>
                </>
              }
            />
          </div>,
          document.body,
        )}
      <GuidebookCreateSheet
        isOpen={isGuidebookCreateSheetOpen}
        onClose={() => setIsGuidebookCreateSheetOpen(false)}
        guidebookId={guidebookId ?? undefined}
        initialValues={
          guidebook
            ? {
                title: guidebook.title,
                description: guidebook.description,
                emoji: guidebook.emoji,
                color: guidebook.color,
                thumbnailUrl: guidebook.thumbnailUrl,
              }
            : undefined
        }
      />
      {isExitModalOpen && (
        <ExitConfirmModal
          title="삭제하기"
          description="가이드북을 삭제할까요?"
          warningText="삭제된 내용은 복구할 수 없어요."
          confirmLabel="삭제"
          onCancel={() => {
            setIsExitModalOpen(false);
            setIsActionSheetOpen(false);
          }}
          onConfirm={() => {
            if (guidebookId) deleteGuidebook(guidebookId);
          }}
        />
      )}
    </>
  );
}
