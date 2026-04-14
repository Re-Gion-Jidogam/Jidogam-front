"use client";

import Button from "@/components/Button";

import { MAX_CHALLENGE_COUNT } from "../constants/guidebookConstants";

interface ChallengeButtonProps {
  isChallenging: boolean;
  isMaxChallenges: boolean;
}

export function ChallengeButton({
  isChallenging,
  isMaxChallenges,
}: ChallengeButtonProps) {
  if (isMaxChallenges) {
    return (
      <div className="flex flex-1 flex-col items-center gap-1">
        <Button
          color="green"
          variants="primary"
          disabled
          className="w-full py-3"
        >
          도전하기
        </Button>
        <p className="text-xs text-gray-500">
          {MAX_CHALLENGE_COUNT}개까지만 도전가능해요
        </p>
      </div>
    );
  }

  if (isChallenging) {
    return (
      <div className="flex flex-1 flex-col items-center gap-1">
        <Button color="red" variants="outlined" className="w-full py-3">
          도전 취소
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <Button color="green" variants="primary" className="w-full py-3">
        도전하기
      </Button>
    </div>
  );
}
