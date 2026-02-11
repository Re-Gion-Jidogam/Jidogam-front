import { useEffect, useState } from "react";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import SVGIcon from "./SVGIcon";

export type SnapPoint = "96px" | "45vh" | "auto" | "95vh";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoint?: SnapPoint;
  snapPoints?: SnapPoint[];
  showBackButton?: boolean;
  onBack?: () => void;
  onSnapChange?: (snapPoint: SnapPoint) => void;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  snapPoint = "45vh",
  snapPoints,
  showBackButton = false,
  onBack,
  onSnapChange,
}: BottomSheetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSnap, setCurrentSnap] = useState(snapPoint);

  useEffect(() => {
    setCurrentSnap(snapPoint);
  }, [snapPoint]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleDragEnd = (_: unknown, info: { offset: { y: number } }) => {
    if (!snapPoints || snapPoints.length < 2) {
      if (info.offset.y > 100) onClose();
      return;
    }

    const currentIndex = snapPoints.indexOf(currentSnap);

    // 아래로 스와이프 → 더 작은 snap
    if (info.offset.y > 50 && currentIndex < snapPoints.length - 1) {
      const next = snapPoints[currentIndex + 1];
      setCurrentSnap(next);
      onSnapChange?.(next);
    }
    // 위로 스와이프 → 더 큰 snap
    else if (info.offset.y < -50 && currentIndex > 0) {
      const next = snapPoints[currentIndex - 1];
      setCurrentSnap(next);
      onSnapChange?.(next);
    }
    // 많이 내리면 닫기
    else if (info.offset.y > 200) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {currentSnap === "95vh" && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}

          <motion.div
            className={clsx(
              "fixed bottom-0 left-0 right-0 z-50",
              "flex flex-col p-3",
              {
                "h-[96px]": currentSnap === "96px",
                "h-[45vh]": currentSnap === "45vh",
                "h-auto": currentSnap === "auto",
                "h-[95vh]": currentSnap === "95vh",
              },
              "bg-[#F5F5F5]/80 backdrop-blur-2xl",
              "rounded-t-[20px] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]",
              "transition-[height] duration-300 ease-out",
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 40, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="relative flex justify-center items-start pb-[18px] cursor-grab active:cursor-grabbing">
              {showBackButton && (
                <div onClick={onBack} className="absolute left-0">
                  <SVGIcon icon="BottomSheetLeftChevron" />
                </div>
              )}
              <div className="w-12 h-1 bg-black/30 rounded-[10px]" />
            </div>

            <div className="flex-1 min-h-0 pb-3 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
