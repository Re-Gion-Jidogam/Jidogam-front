// 회원가입 - 인증번호 입력하는 페이지

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

import { Timer } from "./Timer";

interface VerificationStepProps {
  email: string;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  timeLeft: number;
  onVerify: () => void;
}

export function VerificationStep({
  email,
  verificationCode,
  setVerificationCode,
  timeLeft,
  onVerify,
}: VerificationStepProps) {
  return (
    <div className="w-full h-full p-3 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 items-center">
          <p className="font-medium text-lg text-gray-800">반가워요!</p>
          <div className="flex flex-col items-center">
            <p className="font-semibold text-lg text-gray-800">{email}</p>
            <p className="font-medium text-sm text-gray-800">
              위 메일로 보낸 인증번호를 입력해주세요
            </p>
          </div>
        </div>

        <div className="w-full">
          <TextInput
            label="인증번호"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              const limited = cleaned.slice(0, 6);
              setVerificationCode(limited);
            }}
            rightElement={<Timer seconds={timeLeft} />}
            showCharCount={false}
          />
        </div>
      </div>

      <Button
        color="green"
        variants="primary"
        onClick={onVerify}
        disabled={verificationCode.length !== 6 || timeLeft === 0}
        className="py-3.5"
      >
        계속
      </Button>
    </div>
  );
}
