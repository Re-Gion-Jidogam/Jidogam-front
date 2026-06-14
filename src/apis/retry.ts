import { ApiError } from "./client";

export const NON_RETRYABLE_STATUSES: ReadonlySet<number> = new Set([
  400, 401, 403, 404, 409,
]);

interface ErrorWithStatus {
  status?: number;
}

export function shouldRetry(failureCount: number, error: unknown): boolean {
  const status =
    error instanceof ApiError
      ? error.status
      : (error as ErrorWithStatus | undefined)?.status;

  if (typeof status === "number" && NON_RETRYABLE_STATUSES.has(status)) {
    return false;
  }
  return failureCount < 1;
}
