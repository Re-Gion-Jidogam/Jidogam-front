import { useEffect, useState } from "react";

import clsx from "clsx";

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
      document.body.style.overflow = "hidden"; // 배경 스크롤 막는 기능
    } else {
      document.body.style.overflow = ""; // 배경 스크롤 다시 허용하는 기능
      const timer = setTimeout(() => setIsVisible(false), 300); // 300ms 후에 DOM에서 제거하는 기능 (닫히는 애니메이션 고려)
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리하는 기능
    }
  }, [isOpen]); // 바텀시트 컴포넌트가 열렸다 닫혔다 할 때마다 재실행

  if (!isVisible) return null;

  return (
    <>
      {/* 배경 클릭 시 닫기 (snapPoint가 95vh일 때만) */}
      {snapPoint === "95vh" && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      )}

      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 z-50",
          "flex flex-col",
          "p-3",
          "bg-[#F5F5F5]/80 backdrop-blur-2xl",
          "rounded-t-[20px] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]",
        )}
      >
        {/* 돌아가기 버튼 + handler 레이아웃 */}
        <div className="relative flex justify-center items-start pb-[18px]">
          {showBackButton && (
            <div onClick={onBack} className="absolute left-0">
              <SVGIcon icon="BottomSheetLeftChevron" />
            </div>
          )}

          <div className="w-12 h-1 bg-black/30 rounded-[10px] cursor-grab" />
        </div>

        {/* 그 때 그 때 바텀 시트에 담아야 할 내용을 children으로 렌더링 */}
        <div
          className={clsx("flex-1 overflow-y-auto p-4", {
            "overflow-y-visible": snapPoint === "auto",
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
}
