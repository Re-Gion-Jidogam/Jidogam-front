// 로그인 및 회원가입 페이지 (이메일 주소 입력하는 곳)

import React, { useState } from "react";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

import { validateEmail } from "../_utils/validation";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
}

export function EmailStep({ email, setEmail, onSubmit }: EmailStepProps) {
  const [emailError, setEmailError] = useState("");

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다");
      return;
    }
    onSubmit();
  };

  return (
    <div className="w-full p-3 flex flex-col h-full justify-between">
      <div className="w-full flex flex-col gap-1">
        <TextInput
          label="이메일"
          errorMessage={emailError}
          maxLength={50}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />
      </div>

      <Button
        color="green"
        className="w-full border border-white/60 py-3.5"
        onClick={handleSubmit}
      >
        계속
      </Button>
    </div>
  );
}
