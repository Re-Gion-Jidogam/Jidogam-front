"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";
import { guidebookApi } from "@/app/map/guidebook/_domain/api/guidebook.api";
import { DomainError, mapApiError } from "@/app/map/guidebook/_domain/errors/domainError";
import { guidebookQueryKey } from "@/app/map/guidebook/_domain/queries/guidebook.query-key";

export type RemovePlaceErrorKind =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "UNKNOWN";

export type RemovePlaceError = DomainError<RemovePlaceErrorKind>;

function toDomainError(error: unknown): RemovePlaceError {
  return mapApiError(
    error,
    "RemovePlaceError",
    { 401: "UNAUTHORIZED", 403: "FORBIDDEN", 404: "NOT_FOUND" },
    "SERVER_ERROR",
    "UNKNOWN",
  );
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
