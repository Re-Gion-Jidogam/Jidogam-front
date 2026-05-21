"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/apis/client";
import { shouldRetry } from "@/apis/retry";
import { guidebookApi } from "../api/guidebook.api";
import { guidebookQueryKey } from "../queries/guidebook.query-key";

export type GuidebookDeleteErrorKind =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class GuidebookDeleteError extends Error {
  readonly kind: GuidebookDeleteErrorKind;
  readonly status?: number;

  constructor(kind: GuidebookDeleteErrorKind, status?: number, message?: string) {
    super(message ?? kind);
    this.name = "GuidebookDeleteError";
    this.kind = kind;
    this.status = status;
  }
}

function toDomainError(error: unknown): GuidebookDeleteError {
  const message = error instanceof Error ? error.message : "";
  const status = error instanceof ApiError ? error.status : undefined;

  if (status === 401) return new GuidebookDeleteError("UNAUTHORIZED", 401, message);
  if (status === 403) return new GuidebookDeleteError("FORBIDDEN", 403, message);
  if (status === 404) return new GuidebookDeleteError("NOT_FOUND", 404, message);
  if (status && status >= 500) return new GuidebookDeleteError("SERVER_ERROR", status, message);
  return new GuidebookDeleteError("UNKNOWN", status, message);
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
