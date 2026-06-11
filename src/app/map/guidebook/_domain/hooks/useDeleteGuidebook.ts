"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";
import { guidebookApi } from "../api/guidebook.api";
import { DomainError, mapApiError } from "../errors/domainError";
import { guidebookQueryKey } from "../queries/guidebook.query-key";

export type GuidebookDeleteErrorKind =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "UNKNOWN";

export type GuidebookDeleteError = DomainError<GuidebookDeleteErrorKind>;

function toDomainError(error: unknown): GuidebookDeleteError {
  return mapApiError(
    error,
    "GuidebookDeleteError",
    { 401: "UNAUTHORIZED", 403: "FORBIDDEN", 404: "NOT_FOUND" },
    "SERVER_ERROR",
    "UNKNOWN",
  );
}

interface UseDeleteGuidebookOptions {
  onSuccess?: () => void;
  onError?: (error: GuidebookDeleteError) => void;
}

export function useDeleteGuidebook({ onSuccess, onError }: UseDeleteGuidebookOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<void, GuidebookDeleteError, string>({
    mutationKey: ["guidebook", "delete"],
    mutationFn: async (guidebookId: string) => {
      try {
        await guidebookApi.delete(guidebookId);
      } catch (error) {
        throw toDomainError(error);
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: guidebookQueryKey.lists() }),
        queryClient.invalidateQueries({ queryKey: guidebookQueryKey.infinites() }),
      ]);
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
    retry: shouldRetry,
  });
}
