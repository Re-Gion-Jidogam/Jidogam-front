"use client";

import { useState } from "react";

import { SignupStep } from "./_components/SignupStep";

export default function Account() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SignupStep
      email="example@example.com"
      nickname={nickname}
      nicknameStatus="available"
      password={password}
      confirmPassword={confirmPassword}
      onNicknameChange={setNickname}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSignup={() => console.log("clicked!")}
    />
  );
}
