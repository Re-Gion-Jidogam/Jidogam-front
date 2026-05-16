"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  CardValueType,
  GuidebookCardModifyBackgroundLayerMode,
} from "@/components/GuidebookCard/GuidebookModifyCard";

import { useCreateGuidebook } from "./useCreateGuidebook";

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
  sliderValue: number;
}

function normalizeThumbnail(thumbnailUrl: string | null): string | undefined {
  if (!thumbnailUrl || thumbnailUrl.startsWith("blob:")) {
    return undefined;
  }

  return thumbnailUrl;
}

interface UseGuidebookCreateOptions {
  onClose?: () => void;
}

export function useGuidebookCreate({ onClose }: UseGuidebookCreateOptions = {}) {
  const router = useRouter();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cardMode, setCardMode] =
    useState<GuidebookCardModifyBackgroundLayerMode>("none");
  const [form, setForm] = useState<GuidebookCreateForm>({
    color: sliderValueToColor(INITIAL_SLIDER_VALUE),
    emoji: null,
    thumbnailUrl: null,
    title: "",
    description: "",
    sliderValue: INITIAL_SLIDER_VALUE,
  });

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

  const handleCardValueChange = (cardValue: CardValueType) => {
    setForm((prev) => ({ ...prev, ...cardValue }));
  };

  const handleExitRequest = () => setIsExitModalOpen(true);
  const handleExitCancel = () => setIsExitModalOpen(false);

  const handleOpenActionSheet = () => setIsActionSheetOpen(true);
  const handleCloseActionSheet = () => setIsActionSheetOpen(false);

  const handleSelectEmoji = (emoji: string) => {
    setForm((prev) => ({ ...prev, emoji, thumbnailUrl: null }));
    setIsActionSheetOpen(false);
  };

  const handleImageUpload = (file: File) => {
    const thumbnailUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, thumbnailUrl, color: null, emoji: null }));
    setCardMode("none");
    setIsActionSheetOpen(false);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const { mutate: createGuidebook, isPending: isSubmitting } =
    useCreateGuidebook({
      onSuccess: () => {
        setShowToast(true);
        onClose?.();
      },
      onError: (error) => {
        console.error("가이드북 생성 실패", {
          kind: error.kind,
          status: error.status,
          message: error.message,
        });

        if (error.kind === "UNAUTHORIZED") {
          router.push("/account");
          return;
        }
        setErrorMessage(
          error.kind === "BAD_REQUEST"
            ? "입력값을 확인해주세요"
            : error.kind === "FORBIDDEN"
              ? "이 계정은 가이드북 생성 권한이 없어요"
            : "가이드북 생성에 실패했어요",
        );
      },
    });

  const handleSubmit = () => {
    const title = form.title.trim();

    if (!title) {
      setErrorMessage("제목을 입력해주세요");
      return;
    }

    createGuidebook({
      title,
      description: form.description.trim(),
      emoji: form.emoji ?? undefined,
      color: form.color ?? undefined,
      thumbnail: normalizeThumbnail(form.thumbnailUrl),
    });
  };

  const isColorPickerDisabled = form.thumbnailUrl !== null;

  return {
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
  };
}
