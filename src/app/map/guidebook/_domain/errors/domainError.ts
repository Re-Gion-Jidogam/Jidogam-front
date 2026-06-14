import { ApiError } from "@/apis/client";

export class DomainError<K extends string> extends Error {
  readonly kind: K;
  readonly status?: number;

  constructor(name: string, kind: K, status?: number, message?: string) {
    super(message ?? kind);
    this.name = name;
    this.kind = kind;
    this.status = status;
  }
}

export function mapApiError<K extends string>(
  error: unknown,
  name: string,
  statusMap: Partial<Record<number, K>>,
  serverErrorKind: K,
  unknownKind: K,
): DomainError<K> {
  const message = error instanceof Error ? error.message : "";
  const status = error instanceof ApiError ? error.status : undefined;

  if (status !== undefined) {
    const mapped = statusMap[status];
    if (mapped !== undefined) return new DomainError(name, mapped, status, message);
    if (status >= 500) return new DomainError(name, serverErrorKind, status, message);
  }

  return new DomainError(name, unknownKind, status, message);
}
