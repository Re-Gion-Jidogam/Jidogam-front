import React from "react";

import TextInput from "@/components/TextInput";

export function EmailStep() {
  return (
    <div className="w-full p-3 flex flex-col h-full justify-between">
      <div className="w-full flex flex-col gap-1">
        <TextInput
          label="이메일"
          errorMessage="잘못된 이메일입니다."
          maxLength={50}
        />
      </div>
    </div>
  );
}
