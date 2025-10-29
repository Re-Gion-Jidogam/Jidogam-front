import { useState } from "react";

export const useAuth = () => {
  const [currentStep, setCurrentStep] = useState("email"); // 현재 회원가입 단계 표현
  const [email, setEmail] = useState(""); // 이메일 상태
  const [isExistingUser, setIsExistingUser] = useState(false); // 기존 사용자 여부 상태
  const [users, setUsers] = useState([
    {
      nickname: "지나가던사람",
      email: "example@example.com",
      password: "password123",
    },
  ]); // 가입된 사용자 목록

  // 이메일로 사용자 존재 여부 확인
  const checkUserExists = (email: string) => {
    return users.find((u) => u.email === email);
  };

  // 새로운 사용자 추가
  const addUser = (email: string, password: string, nickname: string) => {
    setUsers([...users, { email, password, nickname }]);
  };

  // 이메일과 비밀번호로 로그인 검증
  const verifyLogin = (email: string, password: string) => {
    return users.find((u) => u.email === email && u.password === password);
  };

  return {
    currentStep,
    setCurrentStep,
    email,
    setEmail,
    isExistingUser,
    setIsExistingUser,
    users,
    checkUserExists,
    addUser,
    verifyLogin,
  };
};
