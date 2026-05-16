import { getAccessToken, waitForAuthReady } from "./auth-token";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  skipAuthReady?: boolean;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  data?: unknown;

  constructor(
    status: number,
    message: string,
    options?: { code?: string; data?: unknown },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = options?.code;
    this.data = options?.data;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, skipAuthReady = false, ...rest } = options;

  if (!skipAuthReady) {
    await waitForAuthReady();
  }

  const accessToken = getAccessToken();

  const mergedHeaders = new Headers(headers);
  if (!mergedHeaders.has("Content-Type")) {
    mergedHeaders.set("Content-Type", "application/json");
  }
  if (accessToken && !mergedHeaders.has("Authorization")) {
    mergedHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: mergedHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    let errorPayload: { code?: string; message?: string; data?: unknown } = {};
    try {
      errorPayload = await response.json();
    } catch {
      // 응답 본문이 JSON이 아니면 무시
    }

    throw new ApiError(
      response.status,
      errorPayload.message ??
        `API Error: ${response.status} ${response.statusText}`,
      { code: errorPayload.code, data: errorPayload.data },
    );
  }

  if (
    response.status === 204 ||
    response.headers.get("Content-Length") === "0"
  ) {
    return undefined as T;
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { method: "POST", body, ...options }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { method: "PUT", body, ...options }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: "DELETE", ...options }),
};
