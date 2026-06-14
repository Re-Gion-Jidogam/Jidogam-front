"use client";

import { createPortal } from "react-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface EmojiPickerBottomSheetProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPickerBottomSheet({
  onSelectEmoji,
  onClose,
}: EmojiPickerBottomSheetProps) {
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onSelectEmoji(emojiData.emoji);
  };

  return createPortal(
    <div className="fixed inset-0 z-60">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-0 right-0">
        <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" />
      </div>
    </div>,
    document.body,
  );
}
