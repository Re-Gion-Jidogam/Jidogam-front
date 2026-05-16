"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/apis/client";
import { shouldRetry } from "@/apis/retry";

import {
  GuidebookCreateRequest,
  guidebookApi,
} from "../api/guidebook.api";
import { guidebookQueryKey } from "../queries/guidebook.query-key";

export type GuidebookCreateErrorKind =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class GuidebookCreateError extends Error {
  readonly kind: GuidebookCreateErrorKind;
  readonly status?: number;

  constructor(
    kind: GuidebookCreateErrorKind,
    status?: number,
    message?: string,
  ) {
    super(message ?? kind);
    this.name = "GuidebookCreateError";
    this.kind = kind;
    this.status = status;
  }
}

function toDomainError(error: unknown): GuidebookCreateError {
  const message = error instanceof Error ? error.message : "";
  const status = error instanceof ApiError ? error.status : undefined;

  if (status === 400)
    return new GuidebookCreateError("BAD_REQUEST", 400, message);
  if (status === 401)
    return new GuidebookCreateError("UNAUTHORIZED", 401, message);
  if (status === 403)
    return new GuidebookCreateError("FORBIDDEN", 403, message);
  if (status && status >= 500)
    return new GuidebookCreateError("SERVER_ERROR", status, message);
  return new GuidebookCreateError("UNKNOWN", status, message);
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
