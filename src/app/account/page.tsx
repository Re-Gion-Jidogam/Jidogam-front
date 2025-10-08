"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import BottomSheet from "@/components/BottomSheet";

import AuthFlow from "./_components/AuthFlow";
import { ExitModal } from "./_components/ExitModal";
import { useAuth } from "./_hooks/useAuth";

export default function Account() {
  const router = useRouter();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);

  const { currentStep } = useAuth();

  const handleBack = () => {
    setIsBackModalOpen(true);
  };

  const handleConfirmExit = () => {
    setIsBackModalOpen(false);
    setIsBottomSheetOpen(false);
    router.push("/cta");
  };

  let title = "";
  switch (currentStep) {
    case "email":
      title = "로그인 및 회원가입";
      break;
    case "verification":
      title = "회원가입";
      break;
    case "signup":
      title = "회원가입";
      break;
    case "login":
      title = "로그인";
      break;
    case "passwordReset":
      title = "비밀번호 찾기";
      break;
    case "confetti":
      title = "가입완료";
      break;
  }

  return (
    <>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        snapPoint="95vh"
        showBackButton={true}
        onBack={handleBack}
      >
        <div className="w-full flex items-center justify-center">
          <p className="font-semibold text-sm text-gray-800">{title}</p>
        </div>
        <AuthFlow />
      </BottomSheet>

      {isBackModalOpen && (
        <ExitModal
          onClickClose={() => setIsBackModalOpen(false)}
          onConfirm={handleConfirmExit}
        />
      )}
    </>
  );
}
