"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../_hooks/useAuth";
import { useSignup } from "../_hooks/useSignup";
import { useVerification } from "../_hooks/useVerification";

import { ConfettiScreen } from "./ConfettiScreen";
import { EmailStep } from "./EmailStep";
import { LoginStep } from "./LoginStep";
import { PasswordResetStep } from "./PasswordResetStep";
import { SignupStep } from "./SignupStep";
import { VerificationStep } from "./VerificationStep";

export default function AuthFlow() {
  const {
    currentStep,
    setCurrentStep,
    email,
    setEmail,
    checkUserExists,
    addUser,
    verifyLogin,
    users,
  } = useAuth();

  const {
    verificationCode,
    setVerificationCode,
    timeLeft,
    setIsVerified,
    verifyCode,
    startTimer,
  } = useVerification();

  const {
    nickname,
    nicknameStatus,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    checkNickname,
  } = useSignup(users);

  const router = useRouter();
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    if (currentStep === "verification") {
      startTimer();
    }
  }, [currentStep]);

  const handleEmailSubmit = () => {
    const existingUser = checkUserExists(email);

    if (existingUser) {
      setCurrentStep("login");
    } else {
      console.log("인증번호 발송:", email);
      setCurrentStep("verification");
    }
  };

  if (currentStep === "email") {
    return (
      <EmailStep
        email={email}
        setEmail={setEmail}
        onSubmit={handleEmailSubmit}
      />
    );
  }

  const handleVerification = () => {
    if (verifyCode(verificationCode)) {
      setIsVerified(true);
      setTimeout(() => {
        setCurrentStep("signup");
      }, 1000);
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  if (currentStep === "verification") {
    return (
      <VerificationStep
        email={email}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        timeLeft={timeLeft}
        onVerify={handleVerification}
      />
    );
  }

  const handleSignup = () => {
    if (!nickname || nicknameStatus !== "available" || !password) {
      alert("모든 필드를 올바르게 입력해주세요");
      return;
    }

    addUser(email, password, nickname);
    setCurrentStep("confetti");
  };

  if (currentStep === "signup") {
    return (
      <SignupStep
        email={email}
        nickname={nickname}
        nicknameStatus={nicknameStatus}
        password={password}
        confirmPassword={confirmPassword}
        onNicknameChange={checkNickname}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSignup={handleSignup}
      />
    );
  }

  if (currentStep === "confetti") {
    return <ConfettiScreen />;
  }

  const handleLogin = () => {
    const user = verifyLogin(email, loginPassword);

    if (user) {
      router.push("/");
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };

  const handlePasswordReset = () => {
    console.log("임시 비밀번호 발송:", email);
    setCurrentStep("password-reset");
  };

  if (currentStep === "login") {
    return (
      <LoginStep
        email={email}
        password={loginPassword}
        onEmailChange={setEmail}
        onPasswordChange={setLoginPassword}
        onLogin={handleLogin}
        onPasswordReset={handlePasswordReset}
      />
    );
  }

  const handlePasswordResetComplete = () => {
    setCurrentStep("login");
  };

  if (currentStep === "password-reset") {
    return (
      <PasswordResetStep
        email={email}
        onLoginPage={handlePasswordResetComplete}
      />
    );
  }

  return <h1>Account Page</h1>;
}
