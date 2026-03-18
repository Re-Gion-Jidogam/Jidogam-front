"use client";

import { useState } from "react";

import {
  CardValueType,
  GuidebookCardModifyBackgroundLayerMode,
} from "@/components/GuidebookCard/GuidebookModifyCard";

const MOCK_LOCATION_COUNT = 5;
const MIN_PUBLISH_LOCATIONS = 5;
const INITIAL_SLIDER_VALUE = 0;

function sliderValueToColor(value: number): string {
  const hue = Math.round(value * 3.3);
  return `hsl(${hue}, 70%, 65%)`;
}

interface GuidebookCreateForm {
  color: string | null;
  emoji: string | null;
  thumbnailUrl: string | null;
  title: string;
  description: string;
  isPublished: boolean;
  sliderValue: number;
}

export function useGuidebookCreate() {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [cardMode, setCardMode] =
    useState<GuidebookCardModifyBackgroundLayerMode>("none");
  const [form, setForm] = useState<GuidebookCreateForm>({
    color: sliderValueToColor(INITIAL_SLIDER_VALUE),
    emoji: null,
    thumbnailUrl: null,
    title: "",
    description: "",
    isPublished: false,
    sliderValue: INITIAL_SLIDER_VALUE,
  });

  const canPublish = MOCK_LOCATION_COUNT >= MIN_PUBLISH_LOCATIONS;

  const handleSliderChange = (sliderValue: number) => {
    setForm((prev) => ({
      ...prev,
      sliderValue,
      color: sliderValueToColor(sliderValue),
    }));
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({ ...prev, title }));
  };

  const handleDescriptionChange = (description: string) => {
    setForm((prev) => ({ ...prev, description }));
  };

  const handlePublishToggleRequest = () => setIsPublishModalOpen(true);

  const handlePublishConfirm = () => {
    setForm((prev) => ({ ...prev, isPublished: true }));
    setIsPublishModalOpen(false);
  };

  const handlePublishModalClose = () => setIsPublishModalOpen(false);

  const handlePublishOff = () => {
    setForm((prev) => ({ ...prev, isPublished: false }));
  };

  const handleCardValueChange = (cardValue: CardValueType) => {
    setForm((prev) => ({ ...prev, ...cardValue }));
  };

  const handleExitRequest = () => setIsExitModalOpen(true);
  const handleExitCancel = () => setIsExitModalOpen(false);

  const handleOpenActionSheet = () => setIsActionSheetOpen(true);
  const handleCloseActionSheet = () => setIsActionSheetOpen(false);

  const handleSelectEmoji = () => {
    setCardMode("emojiReady");
    setIsActionSheetOpen(false);
  };

  const handleImageUpload = (file: File) => {
    const thumbnailUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, thumbnailUrl, color: null, emoji: null }));
    setCardMode("none");
    setIsActionSheetOpen(false);
  };

  const handleSubmit = () => {
    console.log("Creating guidebook:", form);
  };

  const isColorPickerDisabled = form.thumbnailUrl !== null;

  return {
    form,
    canPublish,
    locationCount: MOCK_LOCATION_COUNT,
    cardMode,
    isColorPickerDisabled,
    isExitModalOpen,
    isActionSheetOpen,
    isPublishModalOpen,
    handleExitRequest,
    handleExitCancel,
    handleOpenActionSheet,
    handleCloseActionSheet,
    handleSelectEmoji,
    handleImageUpload,
    handleSliderChange,
    handleTitleChange,
    handleDescriptionChange,
    handlePublishToggleRequest,
    handlePublishConfirm,
    handlePublishModalClose,
    handlePublishOff,
    handleCardValueChange,
    handleSubmit,
  };
}
