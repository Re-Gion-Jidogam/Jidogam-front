"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/apis/client";
import { shouldRetry } from "@/apis/retry";
import { useUserStore } from "@/app/map/guidebook/_domain/store/useUserStore";

import { participationApi } from "../api/participation.api";
import { participationQueryKey } from "../queries/participation.query-key";

export type ParticipationMutationErrorKind =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "ALREADY_PARTICIPATING"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class ParticipationMutationError extends Error {
  readonly kind: ParticipationMutationErrorKind;
  readonly status?: number;

  constructor(
    kind: ParticipationMutationErrorKind,
    status?: number,
    message?: string,
  ) {
    super(message ?? kind);
    this.name = "ParticipationMutationError";
    this.kind = kind;
    this.status = status;
  }
}

function toDomainError(error: unknown): ParticipationMutationError {
  const message = error instanceof Error ? error.message : "";
  const status = error instanceof ApiError ? error.status : undefined;

  if (status === 400)
    return new ParticipationMutationError("BAD_REQUEST", 400, message);
  if (status === 401)
    return new ParticipationMutationError("UNAUTHORIZED", 401, message);
  if (status === 403)
    return new ParticipationMutationError("FORBIDDEN", 403, message);
  if (status === 404)
    return new ParticipationMutationError("NOT_FOUND", 404, message);
  if (status === 409)
    return new ParticipationMutationError("ALREADY_PARTICIPATING", 409, message);
  if (status && status >= 500)
    return new ParticipationMutationError("SERVER_ERROR", status, message);
  return new ParticipationMutationError("UNKNOWN", status, message);
}

type ToggleAction = "start" | "cancel";

interface UseParticipationToggleOptions {
  onSuccess?: (action: ToggleAction) => void;
  onError?: (error: ParticipationMutationError, action: ToggleAction) => void;
}

export function useParticipationToggle(
  guidebookId: string | null,
  options?: UseParticipationToggleOptions,
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);

  async function invalidateParticipations() {
    if (userId) {
      await queryClient.invalidateQueries({
        queryKey: participationQueryKey.list(userId, "progress"),
      });
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: participationQueryKey.lists(),
    });
  }

  function handleError(error: ParticipationMutationError, action: ToggleAction) {
    if (error.kind === "UNAUTHORIZED") {
      router.push("/account");
    }
    options?.onError?.(error, action);
  }

  const startMutation = useMutation<void, ParticipationMutationError, void>({
    mutationKey: ["participation", "start", guidebookId],
    mutationFn: async () => {
      if (!guidebookId) return;

      try {
        await participationApi.start(guidebookId);
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

  const cancelMutation = useMutation<void, ParticipationMutationError, void>({
    mutationKey: ["participation", "cancel", guidebookId],
    mutationFn: async () => {
      if (!guidebookId) return;

      try {
        await participationApi.cancel(guidebookId);
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
