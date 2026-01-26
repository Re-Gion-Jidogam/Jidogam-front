import { useState } from "react";

import { User } from "@/types/auth";

export const useSignup = (users: User[]) => {
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [nicknameStatus, setNicknameStatus] = useState<
    "checking" | "available" | "duplicate" | ""
  >(""); // 닉네임 중복 확인 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태

  // 사용자가 입력한 닉네임이 중복인지 확인하는 함수
  const checkNickname = (value: string) => {
    setNickname(value);
    if (value.length === 0) {
      setNicknameStatus("");
      return;
    }

    setNicknameStatus("checking");

    setTimeout(() => {
      const isDuplicate = users.some((u) => u.nickname === value);
      setNicknameStatus(isDuplicate ? "duplicate" : "available");
    }, 500);
  };

  return {
    nickname,
    nicknameStatus,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    checkNickname,
  };
};
