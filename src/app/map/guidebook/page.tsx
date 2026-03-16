"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import BottomSheet from "@/components/BottomSheet";
import Button from "@/components/Button";

import ColorPickerSection from "./_components/ColorPickerSection";
import GuidebookCreateHeader from "./_components/GuidebookCreateHeader";
import GuidebookFormSection from "./_components/GuidebookFormSection";
import { useGuidebookCreate } from "./_hooks/useGuidebookCreate";

export default function GuidebookCreatePage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const {
    form,
    canPublish,
    handleSliderChange,
    handleTitleChange,
    handleDescriptionChange,
    handlePublishToggle,
    handleCardValueChange,
    handleSubmit,
  } = useGuidebookCreate();

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  return (
    <div className="relative w-full h-screen bg-gray-200">
      <BottomSheet isOpen={isOpen} onClose={handleClose} snapPoint="95vh">
        <div className="flex flex-col h-full overflow-hidden">
          <GuidebookCreateHeader onBack={handleClose} />

          <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5 min-h-0">
            <ColorPickerSection
              color={form.color}
              emoji={form.emoji}
              thumbnailUrl={form.thumbnailUrl}
              sliderValue={form.sliderValue}
              onCardValueChange={handleCardValueChange}
              onSliderChange={handleSliderChange}
            />

            <GuidebookFormSection
              canPublish={canPublish}
              description={form.description}
              onPublishToggle={handlePublishToggle}
              onTitleChange={handleTitleChange}
              onDescriptionChange={handleDescriptionChange}
            />
          </div>

          <div className="shrink-0 px-5 py-3">
            <Button className="w-full py-4" onClick={handleSubmit}>
              만들기
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
