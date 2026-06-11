"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";
import { useUserStore } from "@/store/useUserStore";
import { DomainError, mapApiError } from "@/app/map/guidebook/_domain/errors/domainError";

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

export type ParticipationMutationError = DomainError<ParticipationMutationErrorKind>;

function toDomainError(error: unknown): ParticipationMutationError {
  return mapApiError(
    error,
    "ParticipationMutationError",
    {
      400: "BAD_REQUEST",
      401: "UNAUTHORIZED",
      403: "FORBIDDEN",
      404: "NOT_FOUND",
      409: "ALREADY_PARTICIPATING",
    },
    "SERVER_ERROR",
    "UNKNOWN",
  );
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
