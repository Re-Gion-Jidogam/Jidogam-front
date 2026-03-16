"use client";

import { useState } from "react";

import { CardValueType } from "@/components/GuidebookCard/GuidebookModifyCard";

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

  const handlePublishToggle = (isPublished: boolean) => {
    if (!canPublish) return;
    setForm((prev) => ({ ...prev, isPublished }));
  };

  const handleCardValueChange = (cardValue: CardValueType) => {
    setForm((prev) => ({ ...prev, ...cardValue }));
  };

  const handleSubmit = () => {
    console.log("Creating guidebook:", form);
  };

  return {
    form,
    canPublish,
    locationCount: MOCK_LOCATION_COUNT,
    handleSliderChange,
    handleTitleChange,
    handleDescriptionChange,
    handlePublishToggle,
    handleCardValueChange,
    handleSubmit,
  };
}
