"use client";

import Button from "@/components/Button";

import { MAX_CHALLENGE_COUNT } from "../constants/guidebookConstants";
import { useChallengeQuery } from "../queries/useChallengeQuery";
import { useChallengeToggle } from "../hooks/useChallengeToggle";

interface ChallengeButtonProps {
  guidebookId: string | null;
}

export function ChallengeButton({ guidebookId }: ChallengeButtonProps) {
  const { data, isLoading } = useChallengeQuery(guidebookId);
  const { start, cancel, isPending } = useChallengeToggle(guidebookId);

  const isChallenging = data?.isChallenging ?? false;
  const isMaxChallenges =
    !isChallenging && (data?.challengeCount ?? 0) >= MAX_CHALLENGE_COUNT;
  const isBusy = isLoading || isPending;
  const isUnavailable = !guidebookId;

  if (isUnavailable) {
    return (
      <div className="flex flex-1 flex-col items-center gap-1">
        <Button color="green" variants="primary" className="w-full py-3" disabled>
          도전하기
        </Button>
      </div>
    );
  }

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
        <Button
          color="red"
          variants="outlined"
          className="w-full py-3"
          disabled={isBusy}
          onClick={() => cancel()}
        >
          도전 취소
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <Button
        color="green"
        variants="primary"
        className="w-full py-3"
        disabled={isBusy}
        onClick={() => start()}
      >
        도전하기
      </Button>
    </div>
  );
}
