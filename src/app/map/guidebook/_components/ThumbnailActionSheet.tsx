"use client";

import { ChangeEvent, useRef } from "react";
import { createPortal } from "react-dom";

import ActionSheet from "@/components/ActionSheet";

interface ThumbnailActionSheetProps {
  onClose: () => void;
  onSelectEmoji: () => void;
  onImageUpload: (file: File) => void;
}

export default function ThumbnailActionSheet({
  onClose,
  onSelectEmoji,
  onImageUpload,
}: ThumbnailActionSheetProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
  };

  return createPortal(
    <div className="fixed inset-0 z-60">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"
        onClick={onClose}
      />

      <div
        className={[
          "relative h-full w-[calc(100%-24px)] mx-auto",
          "[&>div>div:first-child]:bg-transparent!",
          "[&>div>div:nth-child(2)>div:first-child]:bg-white!",
          "[&>div>div:nth-child(2)>div:first-child>p]:bg-transparent!",
        ].join(" ")}
        style={{ transform: "translateZ(0)" }}
      >
        <ActionSheet
          actionSheetTitle="가이드북 카드 썸네일"
          onClickBackdrop={onClose}
          body={
            <>
              <ActionSheet.Button onClick={onSelectEmoji}>
                이모지
              </ActionSheet.Button>
              <ActionSheet.Button onClick={() => fileInputRef.current?.click()}>
                이미지 업로드
              </ActionSheet.Button>
            </>
          }
          footer={
            <ActionSheet.Button
              className="bg-gray-0! text-gray-900!"
              onClick={onClose}
            >
              취소
            </ActionSheet.Button>
          }
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>,
    document.body,
  );
}
