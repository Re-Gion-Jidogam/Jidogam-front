"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/apis/client";
import { shouldRetry } from "@/apis/retry";
import { useUserStore } from "@/app/map/guidebook/_domain/store/useUserStore";

import { challengeApi } from "../api/challenge.api";
import { challengeQueryKey } from "../queries/challenge.query-key";

export type ChallengeMutationErrorKind =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "ALREADY_PARTICIPATING"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class ChallengeMutationError extends Error {
  readonly kind: ChallengeMutationErrorKind;
  readonly status?: number;

  constructor(
    kind: ChallengeMutationErrorKind,
    status?: number,
    message?: string,
  ) {
    super(message ?? kind);
    this.name = "ChallengeMutationError";
    this.kind = kind;
    this.status = status;
  }
}

function toDomainError(error: unknown): ChallengeMutationError {
  const message = error instanceof Error ? error.message : "";
  const status = error instanceof ApiError ? error.status : undefined;

  if (status === 400)
    return new ChallengeMutationError("BAD_REQUEST", 400, message);
  if (status === 401)
    return new ChallengeMutationError("UNAUTHORIZED", 401, message);
  if (status === 403)
    return new ChallengeMutationError("FORBIDDEN", 403, message);
  if (status === 404)
    return new ChallengeMutationError("NOT_FOUND", 404, message);
  if (status === 409)
    return new ChallengeMutationError("ALREADY_PARTICIPATING", 409, message);
  if (status && status >= 500)
    return new ChallengeMutationError("SERVER_ERROR", status, message);
  return new ChallengeMutationError("UNKNOWN", status, message);
}

type ToggleAction = "start" | "cancel";

interface UseChallengeToggleOptions {
  onSuccess?: (action: ToggleAction) => void;
  onError?: (error: ChallengeMutationError, action: ToggleAction) => void;
}

export function useChallengeToggle(
  guidebookId: string | null,
  options?: UseChallengeToggleOptions,
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);

  async function invalidateParticipations() {
    if (userId) {
      await queryClient.invalidateQueries({
        queryKey: challengeQueryKey.participation(userId, "progress"),
      });
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: challengeQueryKey.participations(),
    });
  }

  function handleError(error: ChallengeMutationError, action: ToggleAction) {
    if (error.kind === "UNAUTHORIZED") {
      router.push("/account");
    }
    options?.onError?.(error, action);
  }

  const startMutation = useMutation<void, ChallengeMutationError, void>({
    mutationKey: ["challenge", "start", guidebookId],
    mutationFn: async () => {
      if (!guidebookId) return;

      try {
        await challengeApi.start(guidebookId);
      } catch (error) {
        throw toDomainError(error);
      }
    },
    onSuccess: async () => {
      await invalidateParticipations();
      options?.onSuccess?.("start");
    },
    onError: async (error) => {
      if (error.kind === "ALREADY_PARTICIPATING") {
        await invalidateParticipations();
      }
      handleError(error, "start");
    },
    retry: shouldRetry,
  });

  const cancelMutation = useMutation<void, ChallengeMutationError, void>({
    mutationKey: ["challenge", "cancel", guidebookId],
    mutationFn: async () => {
      if (!guidebookId) return;

      try {
        await challengeApi.cancel(guidebookId);
      } catch (error) {
        throw toDomainError(error);
      }
    },
    onSuccess: async () => {
      await invalidateParticipations();
      options?.onSuccess?.("cancel");
    },
    onError: async (error) => {
      if (error.kind === "NOT_FOUND") {
        await invalidateParticipations();
      }
      handleError(error, "cancel");
    },
    retry: shouldRetry,
  });

  return {
    start: () => startMutation.mutate(),
    cancel: () => cancelMutation.mutate(),
    isPending: startMutation.isPending || cancelMutation.isPending,
  };
}
