"use client";

import { useState } from "react";

import Button from "@/components/Button";
import SVGIcon from "@/components/SVGIcon";

interface PasswordResetStepProps {
  email: string;
  onLoginPage: () => void;
}

export function PasswordResetStep({
  email,
  onLoginPage,
}: PasswordResetStepProps) {
  const [status, setStatus] = useState<"email-check" | "send">("email-check");

  const handleStatusChange = () => {
    if (status === "email-check") {
      setStatus("send");
      return;
    }

    onLoginPage();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 gap-8">
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        {status === "send" && (
          <div className="w-[67px] h-[67px]">
            <SVGIcon icon="ToastCheckIcon" className="w-full h-full" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-lg text-gray-800">{email}</p>
          {status === "send" && (
            <p className="font-medium text-sm text-gray-800">
              임시 비밀번호를 보냈어요.
            </p>
          )}
        </div>

        {status === "email-check" && (
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm text-gray-800">
              위 메일이 맞나요?
            </p>
            <p className="font-medium text-sm text-gray-800">
              임시 비밀번호를 발급해드릴게요.
            </p>
          </div>
        )}
      </div>

      <Button
        color="green"
        className="w-full border border-white/60 py-3.5"
        onClick={handleStatusChange}
      >
        {status === "email-check" ? "네, 맞아요" : "로그인 하기"}
      </Button>
    </div>
  );
}
