import { useEffect, useState } from "react";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import SVGIcon from "./SVGIcon";

type SnapPoint = "96px" | "45vh" | "auto" | "95vh";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoint?: SnapPoint;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  snapPoint = "45vh",
  showBackButton = false,
  onBack,
}: BottomSheetProps) {
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 클릭 시 닫기 (snapPoint가 95vh일 때만) */}
          {snapPoint === "95vh" && (
            <motion.div
              className="absolute inset-0 z-40 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}

          <motion.div
            className={clsx(
              "absolute bottom-0 left-0 right-0 z-50",
              "flex flex-col",
              {
                "h-[96px]": snapPoint === "96px",
                "h-[45vh]": snapPoint === "45vh",
                "h-auto": snapPoint === "auto",
                "h-[95vh]": snapPoint === "95vh",
              },
              "bg-[#F5F5F5]/80 backdrop-blur-2xl",
              "rounded-t-[20px] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]",
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 40, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
          >
            {/* 돌아가기 버튼 + handler */}
            <div className="relative flex justify-center items-start pb-[18px] cursor-grab active:cursor-grabbing">
              {showBackButton && (
                <div onClick={onBack} className="absolute top-2 left-2">
                  <SVGIcon icon="BottomSheetLeftChevron" />
                </div>
              )}

              <div className="w-12 h-1 bg-black/30 rounded-[10px] mt-3" />
            </div>

            {/* 내용 */}
            <div
              className={clsx("flex-1 min-h-0 pb-3", {
                "overflow-y-auto": snapPoint === "auto",
                "overflow-hidden": snapPoint !== "auto",
              })}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
