"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Confetti from "react-confetti";

import Button from "@/components/Button";

export function ConfettiScreen() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 클라이언트 사이드에서만 window 크기 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStart = () => {
    router.push("/");
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-3">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={500}
        recycle={false}
        gravity={0.3}
        colors={[
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#FFA07A",
          "#98D8C8",
          "#F7DC6F",
          "#BB8FCE",
          "#85C1E2",
        ]}
        opacity={0.8}
      />

      <div className="flex flex-col items-center justify-center gap-8 z-10">
        <div className="flex flex-col items-center gap-5">
          {/* 이모지 */}
          <div className="text-7xl">🥳</div>

          {/* 환영 메시지 */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-medium text-gray-800">
              환영해요 <span className="font-bold">지나가던사람</span>님!
            </h2>
            <p className="text-sm font-medium text-gray-800">
              이제 여행을 떠나볼까요?
            </p>
          </div>
        </div>
      </div>

      <Button
        color="green"
        variants="primary"
        onClick={handleStart}
        className="w-full py-3.5 z-10"
      >
        시작하기
      </Button>
    </div>
  );
}
