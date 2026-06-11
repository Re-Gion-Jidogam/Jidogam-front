"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";
import { guidebookApi, type GuidebookUpdateRequest } from "../api/guidebook.api";
import { DomainError, mapApiError } from "../errors/domainError";
import { guidebookQueryKey } from "../queries/guidebook.query-key";
import type { Guidebook } from "@/types/guidebook";

export type GuidebookUpdateErrorKind =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "UNKNOWN";

export type GuidebookUpdateError = DomainError<GuidebookUpdateErrorKind>;

function toDomainError(error: unknown): GuidebookUpdateError {
  return mapApiError(
    error,
    "GuidebookUpdateError",
    { 400: "BAD_REQUEST", 401: "UNAUTHORIZED", 403: "FORBIDDEN", 404: "NOT_FOUND" },
    "SERVER_ERROR",
    "UNKNOWN",
  );
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
