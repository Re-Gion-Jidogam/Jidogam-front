"use client";

import BottomSheet from "@/components/BottomSheet";
import Button from "@/components/Button";
import Toast from "@/components/Toast";

import ColorPickerSection from "../ColorPickerSection";
import ExitConfirmModal from "../Modal/ExitConfirmModal";
import GuidebookCreateHeader from "./GuidebookCreateHeader";
import GuidebookFormSection from "./GuidebookFormSection";
import ThumbnailActionSheet from "../ThumbnailActionSheet";
import { useGuidebookCreate } from "../../hooks/useGuidebookCreate";

interface GuidebookCreateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  guidebookId?: string;
  initialValues?: {
    title?: string;
    description?: string;
    emoji?: string | null;
    color?: string | null;
    thumbnailUrl?: string | null;
  };
}

export default function GuidebookCreateSheet({
  isOpen,
  onClose,
  guidebookId,
  initialValues,
}: GuidebookCreateSheetProps) {
  const {
    form,
    cardMode,
    isEditing,
    isColorPickerDisabled,
    isExitModalOpen,
    isActionSheetOpen,
    handleExitRequest,
    handleExitCancel,
    handleOpenActionSheet,
    handleCloseActionSheet,
    handleSelectEmoji,
    handleImageUpload,
    handleSliderChange,
    handleTitleChange,
    handleDescriptionChange,
    handleCardValueChange,
    handleSubmit,
    showToast,
    errorMessage,
    isSubmitting,
  } = useGuidebookCreate({ onClose, guidebookId, initialValues });

  const handleClose = () => {
    handleExitCancel();
    onClose();
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-0 left-0 right-0 z-100 w-full">
          <Toast
            type="MOVE"
            title={isEditing ? "가이드북을 수정했어요" : "가이드북을 만들었어요!"}
            message=""
          />
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-0 left-0 right-0 z-100 w-full">
          <Toast type="NOT_MOVE" title={errorMessage} message="" />
        </div>
      )}
      {isExitModalOpen && (
        <ExitConfirmModal onCancel={handleExitCancel} onConfirm={handleClose} />
      )}
      {isActionSheetOpen && (
        <ThumbnailActionSheet
          onClose={handleCloseActionSheet}
          onSelectEmoji={handleSelectEmoji}
          onImageUpload={handleImageUpload}
        />
      )}
      <BottomSheet isOpen={isOpen} onClose={handleExitRequest} snapPoint="95vh">
        <div className="flex flex-col h-full overflow-hidden">
          <GuidebookCreateHeader
            title={isEditing ? "가이드북 수정" : "가이드북 만들기"}
            onBack={handleExitRequest}
          />

          <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5 min-h-0">
            <ColorPickerSection
              color={form.color}
              emoji={form.emoji}
              thumbnailUrl={form.thumbnailUrl}
              sliderValue={form.sliderValue}
              cardMode={cardMode}
              disabled={isColorPickerDisabled}
              onCardValueChange={handleCardValueChange}
              onSliderChange={handleSliderChange}
              onClickSelectCardType={handleOpenActionSheet}
            />

            <GuidebookFormSection
              title={form.title}
              description={form.description}
              onTitleChange={handleTitleChange}
              onDescriptionChange={handleDescriptionChange}
            />
          </div>

          <div className="shrink-0 px-5 py-3">
            <Button
              className="w-full py-4"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing ? "수정 중..." : "만드는 중..."
                : isEditing ? "수정하기" : "만들기"}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
