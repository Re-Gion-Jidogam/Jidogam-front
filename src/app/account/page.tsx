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

  const currentStepMap: Record<string, string> = {
    email: "로그인 및 회원가입",
    verification: "회원가입",
    signup: "회원가입",
    login: "로그인",
    passwordReset: "비밀번호 찾기",
    confetti: "가입완료",
  };

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
          <p className="font-semibold text-sm text-gray-800">
            {currentStepMap[currentStep] ?? ""}
          </p>
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
