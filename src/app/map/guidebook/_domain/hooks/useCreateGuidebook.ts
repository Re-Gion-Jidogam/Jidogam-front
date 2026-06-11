"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";

import {
  GuidebookCreateRequest,
  guidebookApi,
} from "../api/guidebook.api";
import { DomainError, mapApiError } from "../errors/domainError";
import { guidebookQueryKey } from "../queries/guidebook.query-key";

export type GuidebookCreateErrorKind =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "SERVER_ERROR"
  | "UNKNOWN";

export type GuidebookCreateError = DomainError<GuidebookCreateErrorKind>;

function toDomainError(error: unknown): GuidebookCreateError {
  return mapApiError(
    error,
    "GuidebookCreateError",
    { 400: "BAD_REQUEST", 401: "UNAUTHORIZED", 403: "FORBIDDEN" },
    "SERVER_ERROR",
    "UNKNOWN",
  );
}

interface UseCreateGuidebookOptions {
  onSuccess?: () => void;
  onError?: (error: GuidebookCreateError) => void;
}

export function useCreateGuidebook(options?: UseCreateGuidebookOptions) {
  const queryClient = useQueryClient();

  return useMutation<void, GuidebookCreateError, GuidebookCreateRequest>({
    mutationKey: ["guidebook", "create"],
    mutationFn: async (body) => {
      try {
        await guidebookApi.create(body);
      } catch (error) {
        throw toDomainError(error);
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: guidebookQueryKey.lists() }),
        queryClient.invalidateQueries({
          queryKey: guidebookQueryKey.infinites(),
        }),
      ]);
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
    retry: shouldRetry,
  });
}
