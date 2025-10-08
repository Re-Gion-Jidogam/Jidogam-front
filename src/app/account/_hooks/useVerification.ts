import { useEffect, useState } from "react";

export const useVerification = () => {
  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 입력 상태
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // 남은 시간 상태 (초 단위)
  const [isVerified, setIsVerified] = useState(false); // 인증 완료 = true, 미완료 = false

  // 1초마다 타이머 감소 (시간이 1초 이상 남았고, 인증 미완료 상태라면)
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !isVerified) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isVerified]);

  const startTimer = () => {
    setTimeLeft(180);
  };

  // 인증번호 재발송이 필요한 경우 사용
  const resetTimer = () => {
    setTimeLeft(180);
    setVerificationCode("");
  };

  // 인증 코드 검증 (예시로 "123456"을 올바른 코드로 가정)
  const verifyCode = (code: string) => {
    return code === "123456";
  };

  return {
    verificationCode,
    setVerificationCode,
    timeLeft: timeLeft ?? 180,
    isVerified,
    setIsVerified,
    resetTimer,
    verifyCode,
    startTimer,
  };
};
