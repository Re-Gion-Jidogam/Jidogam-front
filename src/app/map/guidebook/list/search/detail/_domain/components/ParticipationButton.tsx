"use client";

import Button from "@/components/Button";

import { useParticipationQuery } from "../queries/useParticipationQuery";
import { useParticipationToggle } from "../hooks/useParticipationToggle";

interface ParticipationButtonProps {
  guidebookId: string | null;
}

export function ParticipationButton({ guidebookId }: ParticipationButtonProps) {
  const { data, isLoading } = useParticipationQuery(guidebookId);
  const { start, cancel, isPending } = useParticipationToggle(guidebookId);

  const isParticipating = data?.isParticipating ?? false;
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

  if (isParticipating) {
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
