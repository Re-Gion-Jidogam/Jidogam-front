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
}

export default function GuidebookCreateSheet({
  isOpen,
  onClose,
}: GuidebookCreateSheetProps) {
  const {
    form,
    cardMode,
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
  } = useGuidebookCreate({ onClose });

  const handleClose = () => {
    handleExitCancel();
    onClose();
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-0 left-0 right-0 z-100 w-full">
          <Toast type="MOVE" title="가이드북을 만들었어요!" message="" />
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
          <GuidebookCreateHeader onBack={handleExitRequest} />

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
              {isSubmitting ? "만드는 중..." : "만들기"}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
