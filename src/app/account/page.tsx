"use client";

import { useState } from "react";

import { VerificationStep } from "./_components/VerificationStep";

export default function Account() {
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <VerificationStep
      email="example@example.com"
      verificationCode={verificationCode}
      setVerificationCode={setVerificationCode}
      timeLeft={180}
      onVerify={() => console.log("clicked!")}
    />
  );
}
