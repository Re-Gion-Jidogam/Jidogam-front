"use client";

import { useEffect } from "react";

import {
  getAccessToken,
  getUserIdFromAccessToken,
} from "@/apis/auth-token";
import { useUserStore } from "@/store/useUserStore";

export default function AuthSessionBootstrap() {
  const setUserId = useUserStore((state) => state.setUserId);
  const clearUserId = useUserStore((state) => state.clearUserId);

  useEffect(() => {
    const syncUserSession = () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        clearUserId();
        return;
      }

      const userId = getUserIdFromAccessToken(accessToken);

      if (userId) {
        setUserId(userId);
        return;
      }

      clearUserId();
    };

    syncUserSession();
    window.addEventListener("storage", syncUserSession);

    return () => {
      window.removeEventListener("storage", syncUserSession);
    };
  }, [clearUserId, setUserId]);

  return null;
}
