"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/apis/client";
import { shouldRetry } from "@/apis/retry";
import { guidebookApi, type GuidebookUpdateRequest } from "../api/guidebook.api";
import { guidebookQueryKey } from "../queries/guidebook.query-key";
import type { Guidebook } from "@/types/guidebook";

export type GuidebookUpdateErrorKind =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class GuidebookUpdateError extends Error {
  readonly kind: GuidebookUpdateErrorKind;
  readonly status?: number;

  constructor(kind: GuidebookUpdateErrorKind, status?: number, message?: string) {
    super(message ?? kind);
    this.name = "GuidebookUpdateError";
    this.kind = kind;
    this.status = status;
  }
}

function toDomainError(error: unknown): GuidebookUpdateError {
  const message = error instanceof Error ? error.message : "";
  const status = error instanceof ApiError ? error.status : undefined;

  if (status === 400) return new GuidebookUpdateError("BAD_REQUEST", 400, message);
  if (status === 401) return new GuidebookUpdateError("UNAUTHORIZED", 401, message);
  if (status === 403) return new GuidebookUpdateError("FORBIDDEN", 403, message);
  if (status === 404) return new GuidebookUpdateError("NOT_FOUND", 404, message);
  if (status && status >= 500) return new GuidebookUpdateError("SERVER_ERROR", status, message);
  return new GuidebookUpdateError("UNKNOWN", status, message);
}

interface UseUpdateGuidebookOptions {
  guidebookId: string;
  onSuccess?: (data: Guidebook) => void;
  onError?: (error: GuidebookUpdateError) => void;
}

export function useUpdateGuidebook({ guidebookId, onSuccess, onError }: UseUpdateGuidebookOptions) {
  const queryClient = useQueryClient();

  return useMutation<Guidebook, GuidebookUpdateError, GuidebookUpdateRequest>({
    mutationKey: ["guidebook", "update", guidebookId],
    mutationFn: async (body) => {
      try {
        return await guidebookApi.update(guidebookId, body);
      } catch (error) {
        throw toDomainError(error);
      }
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: guidebookQueryKey.detail(guidebookId) });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
    retry: shouldRetry,
  });
}
