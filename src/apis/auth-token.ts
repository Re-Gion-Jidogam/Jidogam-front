const ACCESS_TOKEN_STORAGE_KEY = "jidogam.accessToken";

interface JwtPayload {
  sub?: string;
}

let authReadyPromise: Promise<void> | null = null;

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function setAccessToken(accessToken: string) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function registerAuthReadyPromise(promise: Promise<void>) {
  authReadyPromise = promise.finally(() => {
    if (authReadyPromise === promise) {
      authReadyPromise = null;
    }
  });
}

export async function waitForAuthReady() {
  if (!authReadyPromise) return;

  await authReadyPromise;
}

export function getUserIdFromAccessToken(accessToken: string): string | null {
  try {
    const [, payload] = accessToken.split(".");
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "=",
    );
    const decodedPayload = JSON.parse(atob(paddedPayload)) as JwtPayload;

    return decodedPayload.sub ?? null;
  } catch {
    return null;
  }
}
