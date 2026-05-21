"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/apis/client";
import { shouldRetry } from "@/apis/retry";
import { guidebookApi } from "@/app/map/guidebook/_domain/api/guidebook.api";
import { guidebookQueryKey } from "@/app/map/guidebook/_domain/queries/guidebook.query-key";

export type RemovePlaceErrorKind =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class RemovePlaceError extends Error {
  readonly kind: RemovePlaceErrorKind;
  readonly status?: number;

  constructor(kind: RemovePlaceErrorKind, status?: number, message?: string) {
    super(message ?? kind);
    this.name = "RemovePlaceError";
    this.kind = kind;
    this.status = status;
  }
}

function toDomainError(error: unknown): RemovePlaceError {
  const message = error instanceof Error ? error.message : "";
  const status = error instanceof ApiError ? error.status : undefined;

  if (status === 401) return new RemovePlaceError("UNAUTHORIZED", 401, message);
  if (status === 403) return new RemovePlaceError("FORBIDDEN", 403, message);
  if (status === 404) return new RemovePlaceError("NOT_FOUND", 404, message);
  if (status && status >= 500) return new RemovePlaceError("SERVER_ERROR", status, message);
  return new RemovePlaceError("UNKNOWN", status, message);
}

interface UseRemovePlaceMutationOptions {
  guidebookId: string;
  onSuccess?: () => void;
  onError?: (error: RemovePlaceError) => void;
}

export function useRemovePlaceMutation({ guidebookId, onSuccess, onError }: UseRemovePlaceMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation<void, RemovePlaceError, string>({
    mutationKey: ["guidebook", "place", "remove", guidebookId],
    mutationFn: async (placeId: string) => {
      try {
        await guidebookApi.removePlace(guidebookId, placeId);
      } catch (error) {
        throw toDomainError(error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: guidebookQueryKey.detail(guidebookId) });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
    retry: shouldRetry,
  });
}
