"use client";

import { useState } from "react";

import { LoginStep } from "./_components/LoginStep";

export default function Account() {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("");

  return (
    <LoginStep
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={() => console.log("Login!!")}
      onPasswordReset={() => console.log("Reset!!")}
    />
  );
}
