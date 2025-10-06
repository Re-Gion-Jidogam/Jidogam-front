"use client";

import { useState } from "react";

import BottomSheet from "@/components/BottomSheet";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const snapPoint = "95vh";

  const handleBack = () => {
    console.log("clicked !");
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        BottomSheet 열기
      </button>

      {/* <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoint={snapPoint}
        showBackButton={false}
      >
        <div className="space-y-4">
          <p>뒤로가기 버튼이 없는 BottomSheet입니다.</p>
        </div>
      </BottomSheet> */}

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoint={snapPoint}
        showBackButton={true}
        onBack={handleBack}
      >
        <div className="space-y-4">
          <p>뒤로가기 버튼이 있는 BottomSheet입니다.</p>
          <p>왼쪽 상단의 화살표를 클릭하면 이전 단계로 돌아갑니다.</p>
        </div>
      </BottomSheet>
    </div>
  );
}
